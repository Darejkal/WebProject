import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectInstanceController, userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';
import { result } from 'lodash';
import { Attendance } from '@/app/_helpers/server/model/attendance';
import { IUserSubjectInstanceFullView, UserSubjectInstanceFullView } from '@/app/_helpers/server/model/subject';

module.exports = apiHandler({
    POST: getAllReports
});
async function getAllReports(req: Request):Promise<any> {
    const {subjectinstanceid}:{subjectinstanceid:string}=await req.json()
    let item=await Attendance.find({subjectinstanceid})
    let member=await UserSubjectInstanceFullView.find({subjectinstanceid,role:"student"})
    let memberMap=new Map<string,IUserSubjectInstanceFullView>();
    for(const m of member){
        memberMap.set(m.userid,m.toObject())
    }
    let result= item.map((v)=>{
        return {...v.toObject(),report:v.report.map(({attended,userid})=>{
            let props=memberMap.get(userid)
            if(props){
                let {username,useremail,role}=props
                console.log({username,useremail,role})
                return {
                    attended,userid,username,useremail,role
                }
            }
            return {
                attended,userid
            }
        })}
    })
    return result
}
getAllReports.schema=joi.object({
    subjectinstanceid:joi.string()
})