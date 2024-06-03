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
	create: async (subjectabbrev: string, name: string, authorid: string) => {
		return subjectController.getByAbbrev(subjectabbrev).then(async () => {
			let subjectinstance = new SubjectInstance({
				subjectabbrev: subjectabbrev,
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
	getNext: async ({limit,next,query}:{limit: number, next?: string,query?: string}) => {
		let searchprops={}
		if(next){
			searchprops={...searchprops,
				_id: { $lt: next } 
			}
		}
		if(query){
			searchprops={...searchprops,
				$text:{
					$search:query,
					$diacriticSensitive:false
				},
			}
		} 
		console.log(searchprops)
		let results;
		if(query){
			results=await SubjectInstance.find(searchprops)
			.limit(limit);
		} else{
			results=await SubjectInstance.find(searchprops)
			.sort({
				_id: -1,
			})
			.limit(limit);
		}
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
	},
	search: async function (query:string,limit:number){
		let results=await SubjectInstance.find({
			$text:{
				$search:query,
				$diacriticSensitive:false
			}
		}).limit(limit).exec();
		return results;
	}
};
