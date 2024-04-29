import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { usersRepo } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: getAttendanceLink
});

async function getAttendanceLink(req: Request) {
    const body = await req.json();
    const { user, token } = await usersRepo.authenticate(body);
    // return jwt token in http only cookie
    cookies().set('authorization', token, { httpOnly: true });

    return user
}
getAttendanceLink.schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
});