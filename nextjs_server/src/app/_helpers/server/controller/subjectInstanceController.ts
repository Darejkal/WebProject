import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const SubjectInstance = db.SubjectInstance;


export const subjectInstanceController = {
    create,
};
function create(params:{}){

}



