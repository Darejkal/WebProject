import { Exam, ExamAnswer, ExamInstance, Question } from "../model/exam";
import { generateUUID } from "../../utils";
import { userController } from "./userController";
import { SubjectInstance, UserSubjectInstanceRelation } from "../model/subject";
import moment, { ISO_8601 } from "moment";
import { User } from "../model/user";
import { subjectInstanceController } from "./subjectInstanceController";

export const examController = {
	createExam: async (props: {
		name: string;
		questionids: string[];
		category?: string;
		authorid: string;
	}) => {
		const uuid = await generateUUID();
		const createdAt = new Date();
		const questions = await Question.find({ uuid: { $in: props.questionids } });
		if (questions.length < props.questionids.length) {
			throw "some question does not exist";
		}
		const exam = new Exam({
			uuid,
			name: props.name,
			createdat: createdAt,
			questionids: props.questionids,
			authorid: props.authorid,
			...(props.category ? { category: props.category } : {}),
		});
		return await exam.save();
	},
	getExam: async ({ uuid }: { uuid: string }) => {
		let exam = await Exam.findOne({ uuid });
		if (!exam) {
			throw "exam not found";
		}
		return exam;
	},
	getExamAnswerByUser: async ({
		userid,
		examinstanceid,
	}: {
		userid: string;
		examinstanceid: string;
	}) => {
		let examAnswer = await ExamAnswer.findOne({
			userid: userid,
			examinstanceid: examinstanceid,
		});
		if (!examAnswer) {
			throw "no exam answer found";
		}
		return;
	},
	getExamAnswerByUserOrCreate: async ({
		userid,
		examinstanceid,
	}: {
		userid: string;
		examinstanceid: string;
	}) => {
		let examAnswer = await ExamAnswer.findOne({
			userid: userid,
			examinstanceid: examinstanceid,
		});
		if (!examAnswer) {
			examAnswer = await ExamAnswer.create({
				userid,
				examinstanceid,
				uuid: await generateUUID(),
				createdat: new Date(),
			});
		}
		return examAnswer;
	},
	createQuestion: async (props: {
		authorid: string;
		question: string;
		options?: {
			uuid: string;
			text: string;
			score: string;
		}[];
		category?: string;
	}) => {
		if (!props.options) {
			props.options = [];
		}
		let { authorid, question, options, category } = props;
		const user = await userController.getByUUID(authorid);
		if (!user) {
			throw "user does not exists";
		}
		console.log(props);
		const uuid = await generateUUID();
		const createdat = new Date();
		options = await Promise.all(
			options.map(async (v) => ({ ...v, uuid: await generateUUID() }))
		);
		const ques = new Question({
			uuid,
			createdat,
			authorid,
			question,
			options,
			...(category ? { category } : {}),
		});
		console.log("ques");
		console.log(ques);
		return await ques.save();
	},
	deleteExam: async (uuid: string) => {
		const exam = await Exam.findOneAndDelete({ uuid });
		if (!exam) {
			throw "Exam not found";
		}
		return { message: "Exam deleted successfully" };
	},

	findExam: async (uuid: string) => {
		const exam = await Exam.findOne({ uuid });
		if (!exam) {
			throw "Exam not found";
		}
		return exam;
	},

	deleteExamInstance: async (uuid: string) => {
		const examInstance = await ExamInstance.findOneAndDelete({ uuid });
		if (!examInstance) {
			throw "exam instance not found";
		}
		return;
	},

	getExamInstance: async (uuid: string) => {
		const examInstance = await ExamInstance.findOne({ uuid });
		if (!examInstance) {
			throw "exam instance not found";
		}
		return examInstance;
	},
	getNext: async ({
		limit,
		next,
		query,
		authorid,
	}: {
		limit: number;
		next?: string;
		query?: string;
		authorid?: string;
	}) => {
		let searchprops = {};
		if (authorid) {
			searchprops = { ...searchprops, authorid };
		}
		if (query) {
			searchprops = {
				...searchprops,
				$text: {
					$search: query,
					$diacriticSensitive: false,
				},
			};
		}
		console.log(searchprops);
		let results;
		if (query) {
			let nextVal = Number(next);
			if (!nextVal) {
				nextVal = 0;
			}
			results = await Exam.find(searchprops).skip(nextVal).limit(limit);
			return {
				results,
				next: results.length == 0 ? undefined : `${nextVal + results.length}`,
			};
		} else {
			if (next) {
				searchprops = { ...searchprops, _id: { $lt: next } };
			}
			results = await Exam.find(searchprops)
				.sort({
					_id: -1,
				})
				.limit(limit);
			return {
				results,
				next: results.length == 0 ? undefined : results[results.length - 1]._id,
			};
		}
	},
	getQuestionsByUUIDs: async ({ uuids }: { uuids: string[] }) => {
		let results = await Question.find({ uuid: { $in: uuids } });
		if (results.length < uuids.length) {
			throw "some questions do not exist";
		}
		return results.map(({ question, options, createdat, authorid }) => ({
			question,
			options,
			createdat,
			authorid,
		}));
	},
	getNextQuestionsByAuthor: async ({
		limit,
		next,
		query,
		authorid,
	}: {
		limit: number;
		next?: string;
		query?: string;
		authorid: string;
	}) => {
		let searchprops: any = { authorid };
		if (query) {
			searchprops = {
				...searchprops,
				$text: {
					$search: query,
					$diacriticSensitive: false,
				},
			};
		}
		console.log(searchprops);
		let results;
		if (query) {
			let nextVal = Number(next);
			if (!nextVal) {
				nextVal = 0;
			}
			results = await Question.find(searchprops).skip(nextVal).limit(limit);
			return {
				results,
				next: results.length == 0 ? undefined : `${nextVal + results.length}`,
			};
		} else {
			if (next) {
				searchprops = { ...searchprops, _id: { $lt: next } };
			}
			results = await Question.find(searchprops)
				.sort({
					_id: -1,
				})
				.limit(limit);
			return {
				results,
				next: results.length == 0 ? undefined : results[results.length - 1]._id,
			};
		}
	},
	getNextQuestions: async ({
		limit,
		next,
		query,
	}: {
		limit: number;
		next?: string;
		query?: string;
	}) => {
		let searchprops = {};
		if (query) {
			searchprops = {
				...searchprops,
				$text: {
					$search: query,
					$diacriticSensitive: false,
				},
			};
		}
		console.log(searchprops);
		let results;
		if (query) {
			let nextVal = Number(next);
			if (!nextVal) {
				nextVal = 0;
			}
			results = await Question.find(searchprops).skip(nextVal).limit(limit);
			return {
				results,
				next: results.length == 0 ? undefined : `${nextVal + results.length}`,
			};
		} else {
			if (next) {
				searchprops = { ...searchprops, _id: { $lt: next } };
			}
			results = await Question.find(searchprops)
				.sort({
					_id: -1,
				})
				.limit(limit);
			return {
				results,
				next: results.length == 0 ? undefined : results[results.length - 1]._id,
			};
		}
	},
	createExamInstance: async ({
		examid,
		subjectinstanceid,
		endtime,
		description,
		name,
		authorid,
	}: {
		examid: string;
		subjectinstanceid: string;
		endtime?: string;
		description?: string;
		name?: string;
		authorid: string;
	}) => {
		if (
			typeof endtime !== "undefined" &&
			!moment(endtime, ISO_8601).isValid()
		) {
			throw "invalid date";
		}
		const [exam, subjectinstance, user, usersubjectflag] = await Promise.all([
			Exam.findOne({ uuid: examid }),
			SubjectInstance.findOne({ uuid: subjectinstanceid }),
			User.findOne({ uuid: authorid }),
			subjectInstanceController.doesUserHaveRole(
				authorid,
				"teacher",
				subjectinstanceid
			),
		]);
		if (!exam || !subjectinstance || !user || !usersubjectflag) {
			throw "invalid arguments";
		}
		await ExamInstance.create({
			uuid: await generateUUID(),
			createdat: new Date(),
			examid: exam.uuid,
			subjectinstanceid: subjectinstance.uuid,
			endtime,
			description,
			name,
			authorid,
		});
		return;
	},
	getNextExamInstanceBySubjectInstance: async ({
		limit,
		next,
		query,
		subjectinstanceid,
	}: {
		limit: number;
		next?: string;
		query?: string;
		subjectinstanceid: string;
	}) => {
		let searchprops: any = { subjectinstanceid };
		if (query) {
			searchprops = {
				...searchprops,
				$text: {
					$search: query,
					$diacriticSensitive: false,
				},
			};
		}
		console.log(searchprops);
		let results;
		if (query) {
			let nextVal = Number(next);
			if (!nextVal) {
				nextVal = 0;
			}
			results = await ExamInstance.find(searchprops).skip(nextVal).limit(limit);
			return {
				results,
				next: results.length == 0 ? undefined : `${nextVal + results.length}`,
			};
		} else {
			if (next) {
				searchprops = { ...searchprops, _id: { $lt: next } };
			}
			results = await ExamInstance.find(searchprops)
				.sort({
					_id: -1,
				})
				.limit(limit);
			return {
				results,
				next: results.length == 0 ? undefined : results[results.length - 1]._id,
			};
		}
	},
	// getOrCreateUserSession: async ({
	// 	examinstanceid,
	// 	userid,
	// }: {
	// 	examinstanceid: string;
	// 	userid: string;
	// }) => {

	// },
};
