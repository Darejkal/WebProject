import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const Subject = db.Subject;

export const subjectController = {
    create,
    getByUUID,
    getNext
};
async function create(name:string,abbrev:string,schoolid:string,authorid:string){
    let subject= new Subject({
        name,
        abbrev,
        schoolid,
        authorid,
        uuid:generateUUID(),
        createdat:new Date()
    })
    await subject.save()
    return subject
}
async function getByUUID(uuid:string){
    let subject= await Subject.findOne({uuid})
    if(!subject){
        throw "cannot find the subject"
    }
    return subject
}
async function getNext(limit: number, next?: string) {
	let results= await Subject.find(next?{ _id: { $lt: next } }:{})
		.sort({
			_id: -1,
		})
		.limit(limit);
    return {results,next:results.length==0?undefined:results[results.length - 1]._id}
}



