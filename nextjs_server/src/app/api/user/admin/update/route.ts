import { userController } from '@/app/_helpers/server';
import { apiHandler } from '@/app/_helpers/server/middleware';
import joi from 'joi';
import { cookies } from 'next/headers';


module.exports = apiHandler({
    POST: update
});

async function update(req: Request) {
    const body = await req.json();
    let {uuid,...changedFields}=body;
    await userController.update(uuid,changedFields);
}
update.position="admin"
update.schema = joi.object({
    name: joi.string(),
    email: joi.string(),
    uuid: joi.string(),
    position: joi.string(),
});