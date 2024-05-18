import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { attendanceController, subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
module.exports = apiHandler({
    POST: createAttendance
});

async function createAttendance(req: Request) {
    const body= await req.json()
    const classRole=await subjectInstanceController.getUserSubjectInstanceRelation(body.userid!,body.subjectinstanceid!)
    if(!classRole){
        throw "no role found"
    }else if (classRole.role!="teacher"){
        throw "not permitted"
    } else{
        let attendance= await attendanceController.create(body.subjectinstanceid,body.creatorid)
        return {
            "uuid":attendance.uuid
        }
    }
}
createAttendance.schema = joi.object({
    subjectinstanceid:joi.string().required(),
    userid:joi.string().required()
    // email: joi.string().required(),
    // password: joi.string().required()
});