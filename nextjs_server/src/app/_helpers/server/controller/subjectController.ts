import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const Subject = db.Subject;

export const subjectController = {
    create,
    getById
};
async function create(name:string,abbrev:string,schoolid:string){
    let subject= new Subject({
        "name":name,
        abbrev:abbrev,
        schoolid:schoolid,
        uuid:generateUUID(),
        createdat:new Date()
    })
    return await subject.save()
}
async function getById(id:string){
    try{
        return await Subject.findById(id)
    } catch{

    }
}



