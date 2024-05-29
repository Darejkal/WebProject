import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const Subject = db.Subject;

export const subjectController = {
    create,
    getByUUID,
    getByUUIDs,
    getNext,
    getByAbbrev,
    getByAbbrevs,
    search
};
async function create(name:string,abbrev:string,schoolabbrev:string,authorid:string){
    let subject= new Subject({
        name,
        abbrev,
        schoolabbrev,
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
async function getByAbbrev(abbrev:string){
    let subject= await Subject.findOne({abbrev})
    if(!subject){
        throw "cannot find the subject"
    }
    return subject
}
async function getByUUIDs(uuids:string[]){
    let subjects= await Subject.find({uuid:{$in:uuids}})
    if(!subjects){
        throw "cannot find the subjects"
    }
    return subjects
}
async function getByAbbrevs(abbrevs:string[]){
    let subjects= await Subject.find({abbrev:{$in:abbrevs}})
    if(!subjects){
        throw "cannot find the subjects"
    }
    return subjects
}
async function getNext(limit: number, next?: string) {
	let results= await Subject.find(next?{ _id: { $lt: next } }:{})
		.sort({
			_id: -1,
		})
		.limit(limit);
    return {results,next:results.length==0?undefined:results[results.length - 1]._id}
}
async function search(query:string,limit:number){
    let results=await Subject.find({
        // $or: [
        //     { name:query },
        //     { abbrev:query }
        // ]
        $text:{
            $search:query,
            $diacriticSensitive:false
        }
    }).limit(limit).exec();
    return results;
}