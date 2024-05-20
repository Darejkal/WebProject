import { NextRequest } from 'next/server';
import { auth } from '..';


export { jwtMiddleware };

async function jwtMiddleware(req: NextRequest,{position,ispublic}:{
    position?:string|null,
    ispublic?:Boolean|null
}) {
    if (ispublic===true||isPublicPath(req)){
        return;
    }
    // verify token in request cookie
    const id = auth.authenticate(position);
    if (id){
        req.headers.set('userId', id);
    } else{
        throw "forbidden"
    }
}

function isPublicPath(req: NextRequest) {
    // public routes that don't require authentication
    const publicPaths = [
        'POST:/api/user/login',
        'POST:/api/user/logout',
        'POST:/api/user/signup'
    ];
    return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`);
}