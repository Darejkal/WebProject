import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const auth = {
    authenticate,
    verifyToken
}

function authenticate(required_role:null|string=null) {
    try {
        let id= verifyToken();
        if(required_role){
            verifyRole(id,required_role)
            return true;
        }
    } catch {
        return false;
    }
}
function verifyRole(id:string,required_role:string){
    
}
function verifyToken() {
    const token = cookies().get('authorization')?.value ?? '';
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const id = decoded.sub as string;
    return id;
}
