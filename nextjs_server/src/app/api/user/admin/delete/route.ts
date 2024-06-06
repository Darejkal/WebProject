import { userController } from '@/app/_helpers/server';
import { apiHandler } from '@/app/_helpers/server/middleware';
import joi from 'joi';
import { cookies } from 'next/headers';


module.exports = apiHandler({
    POST: deleteOne
});

async function deleteOne(req: Request) {
    const body = await req.json();
    let {uuid}=body;
    if(!uuid){
        throw "user not found"
    }
    await userController.delete(uuid);
}
deleteOne.position="admin"
deleteOne.schema = joi.object({
    uuid: joi.string(),
});