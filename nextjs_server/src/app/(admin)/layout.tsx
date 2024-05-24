import AppHeader from "../_components/AppHeader";
import { cookies } from "next/headers";
import jwt, { UserJwtPayload } from 'jsonwebtoken';
import { redirect } from "next/navigation";
import { auth } from "../_helpers/server";

export default function AuthenticationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>){
    if(typeof window==="undefined"){
        try{
            const user=auth.verifyToken()
            if(user && typeof user==="object" && "position" in user && user.position==="admin"){
    
            } else{
                throw "forbidden"
            }
        } catch(e){
            redirect("/")
        }
    }

    return <div className="h-100 w-100 ">
		    <AppHeader redirect={true}/>
            {children}

    </div>
}