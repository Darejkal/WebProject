import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';
import { User } from '../model/user';
import { SubjectInstance, UserSubjectInstanceFullView } from '../model/subject';

const Attendance = db.Attendance;

export const attendanceController = {
    create:async function (subjectinstanceid:string,creatorid:string){
        let usersubjectinstance=await UserSubjectInstanceFullView.find({subjectinstanceid:subjectinstanceid})
        if(!usersubjectinstance){
            throw "subjectinstance not found"
        }
        let attendance=new Attendance({
            subjectinstanceid,
            creatorid,
            uuid:await generateUUID(),
            createdat:new Date(),
            report:usersubjectinstance.map((v)=>({
                userid:v.userid,
                attended:false
            }))
        })
        return await attendance.save()
    },
    getByUUID:async function ({uuid}:{uuid:string}){
        return await Attendance.findOne({uuid})
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
    },
    checkin:async ({userid,attendanceid}:{userid:string,attendanceid:string})=>{
        const attendanceReport=await Attendance.findOne({uuid:attendanceid})
        if(!attendanceReport){
            throw "no attendance report found"
        }
        let flag=attendanceReport.report.findIndex((v)=>(v.userid===userid))
        if(flag<0){
            throw "user not related to the report"
        }
        const user=await User.findOne({uuid:userid})
        if(!user){
            throw "no user found"
        }
        attendanceReport.report[flag].attended=true;
        await attendanceReport.save()
    }
};



