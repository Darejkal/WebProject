import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { db } from "../model";
import { customEncrypt, customEncryptCompare, generateUUID } from "../../utils";
import { subjectController } from "./subjectController";
import { userController } from "./userController";
import { FormatListBulleted } from "@mui/icons-material";
const SubjectInstance = db.SubjectInstance;
const UserSubjectInstanceRelation = db.UserSubjectInstanceRelation;

export const subjectInstanceController = {
	create: async (subjectid: string, name: string, authorid: string) => {
		return subjectController.getByUUID(subjectid).then(async () => {
			let subjectinstance = new SubjectInstance({
				subjectid: subjectid,
				name: name,
				uuid: generateUUID(),
				createdat: new Date(),
				authorid,
			});
			return await subjectinstance.save();
		});
	},
	addMember: async (
		userid: string,
		subjectinstanceid: string,
		role: string
	) => {
		let user = await userController.getByUUID(userid);
		let subject = await subjectController.getByUUID(subjectinstanceid);
		let relation = new UserSubjectInstanceRelation({
			userid: user.id,
			subjectinstanceid: subject!.id,
			role: role,
		});
		return await relation.save();
	},
	getUserSubjectInstanceRelation: async (
		userid: string,
		subjectinstanceid: string
	) => {
		let user = await userController.getByUUID(userid);
		let subject = await subjectController.getByUUID(subjectinstanceid);
		let usersubject = await UserSubjectInstanceRelation.findOne({
			userid: user.id,
			subjectinstanceid: subject!.id,
		});
		return usersubject;
	},
	getall: async (userid: string) => {
		let user = await userController.getByUUID(userid);
		if (!user) {
			throw "user not found";
		}
		let usersubjects = await UserSubjectInstanceRelation.find({
			userid: userid,
		});
		if (!usersubjects) {
			throw "usersubjects not found";
		}
		let subjects = await SubjectInstance.find({
			uuid: { $in: usersubjects.map(v=>v.subjectinstanceid) },
		});
		if (!subjects) {
			throw "subjects not found";
		}
		return subjects;
	},
	getNext: async (limit: number, next?: string) => {
		let results = await SubjectInstance.find(next ? { _id: { $lt: next } } : {})
			.sort({
				_id: -1,
			})
			.limit(limit);
		return {
			results,
			next: results.length == 0 ? undefined : results[results.length - 1]._id,
		};
	},
	doesUserHaveRole: async (userid:string,role:string)=>{
		let r=await UserSubjectInstanceRelation.findOne({
			userid:userid,
			role:role
		})
		console.log("r")
		console.log(r)
		return r?true:false
	}
};
