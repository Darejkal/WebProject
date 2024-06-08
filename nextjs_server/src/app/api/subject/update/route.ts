import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectController, subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: update
});

async function update(req: Request) {
    const props=await req.json()
    await subjectController.updateOne(props)
}
update.position="admin"
update.schema = joi.object({
    name:joi.string(),
    uuid:joi.string().required(),
	abbrev: joi.string(),
	createdat: joi.string(),
	description: joi.string(),
	imgurl:joi.string(),
	authorid: joi.string(),
	schoolabbrev: joi.string(),
});