import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const Attendance = db.Attendance;

export const attendanceController = {
    create
};

async function create(params:{subjectid:string,creatorid:string}){
    let attendance=new Attendance({
        subjectid:params.subjectid,
        creatorid:params.creatorid,
        uuid:generateUUID(),
        createdat:new Date()
    })
    return await attendance.save()
}

