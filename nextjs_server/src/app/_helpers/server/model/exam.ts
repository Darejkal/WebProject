import { bool, number } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
mongoose.pluralize(null);
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;
export interface IExam {
	uuid: string;
	name: string;
	createdat: Date;
	questionids?: string[];
	category: string;
	authorid: string;
}
export const Exam: mongoose.Model<IExam> = (() => {
	const schema = new Schema({
		uuid: { type: String, unique: true, required: true },
		name: { type: String, required: true },
		createdat: { type: Date, required: true },
		questionids: [
			{
				type: String,
			},
		],
		category: { type: String, default: "normal" },
		authorid: {
			type: String,
			required: true,
		},
	});
	schema.index({ name: "text", category: "text" });
	return mongoose.models.exam || mongoose.model("exam", schema);
})();
interface IQuestion {
	uuid: string;
	authorid: string;
	question: string;
	options: {
		uuid: string;
		text: string;
		score: string;
	}[];
	createdat: Date;
	category: string;
}
export const Question: mongoose.Model<IQuestion> = (() => {
	const schema = new Schema({
		uuid: { type: String, unique: true, required: true },
		authorid: { type: String, required: true },
		question: { type: String, required: true },
		options: [
			{
				uuid: { type: String },
				text: { type: String },
				score: { type: Number, default: 0 },
			},
		],
		createdat: { type: Date, required: true },
		category: { type: String, default: "normal" },
	});
	schema.index({question:"text","options.text":"text"})
	return mongoose.models.question || mongoose.model("question", schema);
})();
interface IExamInstance{
	uuid:string;
	examid:string;
	subjectinstanceid:string;
	createdat:string;
	endtime?:string;
	description?:string;
	name?:string;
	authorid:string;
}
export const ExamInstance:mongoose.Model<IExamInstance> = (() => {
	const schema = new Schema({
		uuid: { type: String, unique: true, required: true },
		examid: { type: String, required: true },
		subjectinstanceid: { type: String, required: true },
		createdat: { type: Date, required: true },
		endtime: { type: Date, required: false },
		description: { type: Date, required: false },
		name: { type: Date, required: false },
		authorid:{type:String,required:true}
	});
	schema.index({name:"text",description:"text"})
	return mongoose.models.examinstance || mongoose.model("examinstance", schema);
})();
export const ExamAnswer = (() => {
	const schema = new Schema({
		uuid: { type: String, unique: true, required: true },
		userid: { type: String, required: true },
		examinstanceid: { type: String, required: true },
		createdat: { type: Date, required: true },
		choices: [
			{
				questionid: { type: String, required: true },
				optionid: { type: String, default: null },
			},
		],
	});
	return mongoose.models.examanswer || mongoose.model("examanswer", schema);
})();
