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
    create,
    addMember
};
function create(subjectid:string,name:string){
    return subjectController.getById(subjectid).then(
        async ()=>{
            let subjectinstance=new SubjectInstance({
                subjectid:subjectid,
                name:name,
                uuid:generateUUID(),
                createdat:new Date(),
            })
            return await subjectinstance.save()
        }
    )    
}

async function addMember(studentid:string, subjectid:string, role:string){
    let student= await userController.getById(studentid)
    let subject= await subjectController.getById(subjectid)
    let relation= new UserSubjectInstanceRelation({
        userid:student.id,
        subjectid:subject.id,
        role:role
    })
    return await relation.save()
}

