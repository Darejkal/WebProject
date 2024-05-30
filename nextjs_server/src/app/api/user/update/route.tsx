import { userController } from '@/app/_helpers/server';
import { apiHandler } from '@/app/_helpers/server/middleware';
import joi from 'joi';
import { cookies } from 'next/headers';


module.exports = apiHandler({
    POST: update
});

async function update(req: Request) {
    const userid=req.headers.get('userId')
    if (!userid){
        throw "userid not found";
    }
    const body = await req.json();
    await userController.update(userid,body);
}

update.schema = joi.object({
    name: joi.string(),
    email: joi.string(),
});