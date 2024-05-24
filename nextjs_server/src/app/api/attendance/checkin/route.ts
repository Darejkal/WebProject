import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { attendanceController, subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
module.exports = apiHandler({
    POST: checkin
});

async function checkin(req: Request) {
    const body= await req.json()
    const userid=req.headers.get("userId")
    if(!userid){
        throw "userid not found in header"
    }
    await attendanceController.updateUserAttendanceState(userid,body.attendanceUUID,true)
}
checkin.schema = joi.object({
    attendanceUUID:joi.string().required(),
});