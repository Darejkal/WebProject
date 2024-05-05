import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const Subject = db.Subject;

export const subjectController = {
    create,
};
function create(params:{name:string,abbrev:string,schoolid:string}){
    
}



