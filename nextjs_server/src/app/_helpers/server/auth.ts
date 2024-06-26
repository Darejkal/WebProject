import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
declare module 'jsonwebtoken' {
    export interface UserJwtPayload extends jwt.JwtPayload {
        position: string
    }
}

export const auth = {
    authenticate,
    verifyToken,
    setToken
}

function authenticate(required_position:null|string=null) {
    try {
        let decoded= verifyToken();
        if(required_position){
            if(decoded.position!=required_position){
                return null
            }
            return decoded.id;
        }
        return decoded.id;
    } catch {
        return null;
    }
}

function verifyToken() {
    const token = cookies().get('authorization')?.value ?? '';
    if(!token){
        throw "no token"
    }
    const decoded = <jwt.UserJwtPayload>jwt.verify(token, process.env.JWT_SECRET!);
    const id = decoded.sub as string;
    const position = decoded.position as string;
    return {
        id,position
    }
}
function setToken(user:{uuid:string, position:string}) {
	const token = jwt.sign(
		{
			sub: user.uuid,
			position: user.position,
		},
		process.env.JWT_SECRET!,
		{ expiresIn: "7d" }
	);
    cookies().set('authorization', token, { httpOnly: true });cookies().set('authorization', token, { httpOnly: true });
    return token
}
