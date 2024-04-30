import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const Attendance = db.Attendance;

export const attendanceController = {
    create
};

function create(params:{subjectid:string,creatorid:string}){

}
