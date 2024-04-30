import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    GET: getCurrent
});

async function getCurrent(req: Request) {
    const userid=auth.verifyToken()
    const user = userController.getById(userid)
    return user
}
