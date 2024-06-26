import mongoose from "mongoose";
import { User } from "./user";

const Schema = mongoose.Schema;
mongoose.pluralize(null);
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;
interface ISubject {
	name: string;
	abbrev: string;
	createdat: Date;
	description?: string;
	imgurl?:string;
	uuid: string;
	authorid: string;
	schoolabbrev: string;
}
export const Subject: mongoose.Model<ISubject> = (() => {
	const schema = new Schema<ISubject>({
		name: { type: String, required: true },
		abbrev: { type: String, unique: true, required: true },
		createdat: { type: Date, required: true },
		uuid: { type: String, unique: true, required: true },
		authorid: { type: String, required: true },
		imgurl: { type: String,default:"" },
		description: { type: String,default:"" },
		schoolabbrev: { type: String, required: true },
	});
	schema.index({ name: "text", abbrev: "text" });
	return mongoose.models.subject || mongoose.model<ISubject>("subject", schema);
})();
interface ISubjectInstance {
	subjectabbrev: string;
	name: string;
	createdat: Date;
	uuid: string;
	authorid: string;
}
export const SubjectInstance: mongoose.Model<ISubjectInstance> = (() => {
	const schema = new Schema({
		subjectabbrev: { type: String, required: true },
		name: { type: String, required: true },
		uuid: { type: String, unique: true, required: true },
		createdat: { type: Date, required: true },
		authorid: { type: String, required: true },
	});
	schema.index({ name: "text", subjectabbrev: "text" });
	return (
		mongoose.models.subjectinstance ||
		mongoose.model<ISubjectInstance>("subjectinstance", schema)
	);
})();
interface IUserSubjectInstanceRelation {
	uuid:string;
	userid: string;
	subjectinstanceid: string;
	createdat: Date;
	role: string;
}
export const UserSubjectInstanceRelation: mongoose.Model<IUserSubjectInstanceRelation> =
	(() => {
		const schema = new Schema({
			uuid:{ type: String, required: true,unique:true },
			userid: { type: String, required: true },
			subjectinstanceid: { type: String, required: true },
			role: { type: String, required: true, default: "guest" },
			createdat: { type: Date, required: true },
		});
		schema.index({ userid: 1, subjectinstanceid: 1 });
		return (
			mongoose.models.usersubjectinstance ||
			mongoose.model<IUserSubjectInstanceRelation>(
				"usersubjectinstance",
				schema
			)
		);
	})();
export interface IUserSubjectInstanceFullView{
	uuid:string;
    userid: string,
    subjectinstanceid: string,
    role: string,
    createdat: string,
    username: string,
    useremail:string,
    subjectinstancename: string,
    subjectabbrev: string,
}
export const UserSubjectInstanceFullView:mongoose.Model<IUserSubjectInstanceFullView> =  (() => {
	if(mongoose.models.usersubjectinstancefullview){
		return mongoose.models.usersubjectinstancefullview as mongoose.Model<IUserSubjectInstanceFullView>;
	}
	const schema = new Schema({
		uuid:{ type: String, required: true,unique:true },
		userid: { type: String, required: true },
		subjectinstanceid: { type: String, required: true },
		role: { type: String, required: true, default: "guest" },
		createdat: { type: Date, required: true },
	});
	schema.index({ userid: 1, subjectinstanceid: 1 });
	let userSubjectInstanceFullView = mongoose.model("usersubjectinstancefullview", schema) as unknown as mongoose.Model<IUserSubjectInstanceFullView>;
	userSubjectInstanceFullView.createCollection<IUserSubjectInstanceFullView>({
		viewOn: UserSubjectInstanceRelation.modelName,
		pipeline: [
			{
				$lookup: {
					from: User.modelName,
					localField: "userid",
					foreignField: "uuid",
					as: "userinfo",
				},
			},
			{
				$lookup: {
					from: SubjectInstance.modelName,
					localField: "subjectinstanceid",
					foreignField: "uuid",
					as: "subjectinstanceinfo",
				},
			},
			{ $unwind: "$userinfo" },
			{ $unwind: "$subjectinstanceinfo" },
			{
				$project: {
					// _id:1,
					uuid: 1,
					userid: 1,
					subjectinstanceid: 1,
					role: 1,
					createdat: 1,
					username: "$userinfo.name",
					useremail: "$userinfo.email",
					subjectinstancename: "$subjectinstanceinfo.name",
					subjectabbrev: "$subjectinstanceinfo.subjectabbrev",
				},
			},
		],
	});
    return userSubjectInstanceFullView ;
})();
