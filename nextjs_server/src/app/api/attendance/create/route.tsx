import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { attendanceController, subjectInstanceController } from '@/app/_helpers/server';
module.exports = apiHandler({
    POST: createAttendance
});

async function createAttendance(req: Request) {
    const body:{subjectinstanceid:string}= await req.json()
    const userid=req.headers.get("userId")
    if(!userid){
        throw "not permitted"
    }
    const isTeacher=await subjectInstanceController.doesUserHaveRole(userid,"teacher",body.subjectinstanceid!)
    if (!isTeacher){
        throw "not permitted"
    } else{
        let attendance= await attendanceController.create(body.subjectinstanceid,userid)
        return {
            "uuid":attendance.uuid
        }
    }
}
createAttendance.schema = joi.object({
    subjectinstanceid:joi.string().required(),
    // userid:joi.string().required()
    // email: joi.string().required(),
    // password: joi.string().required()
});