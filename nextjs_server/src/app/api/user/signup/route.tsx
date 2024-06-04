import { userController } from '@/app/_helpers/server';
import { apiHandler } from '@/app/_helpers/server/middleware';
import joi from 'joi';


module.exports = apiHandler({
    POST: signup
});

async function signup(req: Request) {
    const {email,password,name,position} = await req.json();
    await userController.create({email,password,name,position:position??"user"});
}

signup.schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(6).required(),
});