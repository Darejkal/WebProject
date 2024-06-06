import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const School = db.School;

export const schoolController = {
    create,
};
async function create(name:string,abbrev:string){
    let school= new School({
        name,
        abbrev,
        uuid:await generateUUID(),
        createdat:new Date(),
    })
    return await school.save()
}
