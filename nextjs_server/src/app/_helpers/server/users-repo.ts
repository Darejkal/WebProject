import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from './db';
import { customEncrypt, customEncryptCompare, generateUUID } from '../utils';

const User = db.User;

export const usersRepo = {
    authenticate,
    getAll,
    getById,
    getCurrent,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }: { email: string, password: string }) {
    const user = await User.findOne({ email:email });
    if (!(user && customEncryptCompare(password,user.password))) {
        throw 'Email or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return {
        user: user.toJSON(),
        token
    };
}

async function getAll() {
    return await User.find();
}

async function getById(id: string) {
    try {
        return await User.findById(id);
    } catch {
        throw 'User Not Found';
    }
}

async function getCurrent() {
    try {
        const currentUserId = headers().get('userId');
        return await User.findById(currentUserId);
    } catch {
        throw 'Current User Not Found';
    }
}

async function create(params: any) {
    // validate
    
    if (await User.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    const user = new User(params);
    user.uuid=generateUUID()
    user.createdat=new Date();

    // hash password
    if (params.password) {
        user.password = customEncrypt(params.password);
    }

    // save user
    await user.save();
}

async function update(id: string, params: any) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== params.email && await User.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = customEncrypt(params.password);
    }

    // copy params properties to user
    Object.assign(user, params);

    await user.save();
}

async function _delete(id: string) {
    await User.findByIdAndDelete(id);
}
