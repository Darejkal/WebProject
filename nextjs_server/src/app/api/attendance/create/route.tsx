import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import {userController,attendanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: getAttendanceLink
});

async function getAttendanceLink(req: Request) {
}
getAttendanceLink.schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
});