import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const Attendance = db.Attendance;

export const attendanceController = {
    create:async function (subjectinstanceid:string,creatorid:string){
        let attendance=new Attendance({
            subjectinstanceid,
            creatorid,
            uuid:generateUUID(),
            createdat:new Date()
        })
        return await attendance.save()
    },
    updateUserAttendanceState: async function (userid:String,attendanceUUID:string, attended:Boolean){
        const attendanceReport=await Attendance.findOne({"uuid":attendanceUUID})
        if(!attendanceReport){
            throw "attendance report not found"
        }
        let reportIndex=attendanceReport.report.findIndex(el=>el.userid==userid)
        if(reportIndex<0){
            throw "user not found in attendance report"
        }
        attendanceReport.report[reportIndex].attended=attended
        await attendanceReport.save()
    }
};



