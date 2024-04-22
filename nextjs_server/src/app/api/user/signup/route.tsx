import { usersRepo } from '@/app/_helpers/server';
import { apiHandler } from '@/app/_helpers/server/api';
import joi from 'joi';


module.exports = apiHandler({
    POST: signup
});

async function signup(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}

signup.schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(6).required(),
});