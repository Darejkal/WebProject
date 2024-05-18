import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';
import { subjectController } from './subjectController';
import {userController} from './userController'
const SubjectInstance = db.SubjectInstance;
const UserSubjectInstanceRelation =db.UserSubjectInstanceRelation;

export const subjectInstanceController = {
    create:async (subjectid:string,name:string,authorid:string)=>{
        return subjectController.getByUUID(subjectid).then(
            async ()=>{
                let subjectinstance=new SubjectInstance({
                    subjectid:subjectid,
                    name:name,
                    uuid:generateUUID(),
                    createdat:new Date(),
                    authorid,
                })
                return await subjectinstance.save()
            }
        )    
    },
    addMember:async (userid:string, subjectinstanceid:string, role:string)=>{
        let user= await userController.getByUUID(userid)
        let subject= await subjectController.getByUUID(subjectinstanceid)
        let relation= new UserSubjectInstanceRelation({
            userid:user.id,
            subjectinstanceid:subject!.id,
            role:role
        })
        return await relation.save()
    },
    getUserSubjectInstanceRelation: async (userid:string,subjectinstanceid:string)=>{
        let user= await userController.getByUUID(userid)
        let subject= await subjectController.getByUUID(subjectinstanceid)
        let usersubject=await UserSubjectInstanceRelation.findOne({
            userid:user.id,
            subjectinstanceid:subject!.id,
        })
        return usersubject
    }
    
};

