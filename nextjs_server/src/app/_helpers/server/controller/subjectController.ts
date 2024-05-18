import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const Subject = db.Subject;

export const subjectController = {
    create,
    getByUUID
};
async function create(name:string,abbrev:string,schoolid:string){
    let subject= new Subject({
        name,
        abbrev,
        schoolid,
        uuid:generateUUID(),
        createdat:new Date()
    })
    return await subject.save()
}
async function getByUUID(uuid:string){
    let subject= await Subject.findOne({uuid})
    if(!subject){
        throw "cannot find the subject"
    }
    return subject
}



