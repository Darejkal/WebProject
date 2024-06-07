import { apiHandler } from "@/app/_helpers/server/middleware";
import {
	examController,
	subjectInstanceController,
	userController,
} from "@/app/_helpers/server";
import { JsonWebTokenError } from "jsonwebtoken";
import { Question } from "@/app/_helpers/server/model/exam";
import { options } from "joi";

module.exports = apiHandler({
	GET: getCurrent,
});

async function getCurrent(
	req: Request,
	{ params: { examinstanceid } }: { params: { examinstanceid: string } }
) {
	const userid = req.headers.get("userId");
	console.log(userid);
	if (!userid) {
		throw new JsonWebTokenError("userid is null");
	}
	const examinstance = await examController.getExamInstance(examinstanceid);
	const rel = await subjectInstanceController.getUserSubjectInstanceRelation(
		userid,
		examinstance.subjectinstanceid
	);
	if (!rel) {
		throw "forbidden";
	}
	const exam = await examController.getExam({ uuid: examinstance.examid });
	const examAnswer = await examController.getExamAnswerByUserOrCreate({
		examinstanceid: examinstance.uuid,
		userid,
	})
	if(examAnswer.closed||
		(examAnswer.endtime&&Date.now()>(new Date(examAnswer.endtime)).getTime())
	){
		throw "session closed"
	}
    let questions= await Question.find({uuid:{$in:exam.questionids}})
    let m=new Map<string,string[]>();
    examAnswer.choices.forEach((v)=>{
        if(!m.get(v.questionid)){
			if(v.optionid){
				m.set(v.questionid,[v.optionid])
			}
        } else{
			if(v.optionid){
				m.get(v.questionid)!.push(v.optionid)
			}
        }
    })
    let result=questions.map((q)=>{
		let choices=m.get(q.uuid)
		return {...q.toObject(),options:q.options.map(({uuid,text})=>{
			return ({uuid,text,...(choices&&{ischosen:(choices.findIndex((v)=>(v==uuid))>-1)})})
		})}
    })
	return {questions:result,examanswerid:examAnswer.uuid,endtime:examinstance.endtime};
}
