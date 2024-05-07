import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const School = db.School;

export const schoolController = {
    create,
};
function create(params:{name:string,abbrev:string,schoolid:string}){
    
}
