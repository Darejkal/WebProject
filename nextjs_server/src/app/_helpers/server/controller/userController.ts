import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../model';
import { customEncrypt, customEncryptCompare, generateUUID } from '../../utils';

const User = db.User;

export const userController = {
    authenticate,
    getAll,
    getByUUID,
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

    const token = jwt.sign({ 
        sub: user.id,
        position:user.position
    }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return {
        user: {
            name:user.name,
            email:user.email,
            createdat:user.createdat,
            uuid:user.uuid,
            position:user.position,
            id:user.id
        },
        token
    };
}

async function getAll() {
    return await User.find();
}

async function getByUUID(uuid: string) {
    let user= await User.findOne({uuid});
    if(!user){
        throw 'user not found';
    }
    return user
}

async function getCurrent() {
    const uuid = headers().get('userId');
    if(!uuid){
        throw 'user not found';
    }
    return await getByUUID(uuid)
}

async function create(email:string,password:string,position:"user"|"admin"="user") {
    if (await User.findOne({ email: email })) {
        throw 'Email "' + email + '" is already taken';
    }

    const user = new User({
        email,password,position
    });
    user.uuid=generateUUID()
    user.createdat=new Date();

    // hash password
    if (password) {
        user.password = customEncrypt(password);
    }

    // save user
    await user.save();
}

async function update(uuid: string, params: any) {
    const user = await getByUUID(uuid)

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

async function _delete(uuid: string) {
    await User.findOneAndDelete({uuid});
}

