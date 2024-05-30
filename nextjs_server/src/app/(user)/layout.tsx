"use server";

import { auth, userController } from "@/app/_helpers/server";
import { notFound, redirect } from "next/navigation";
import AppHeader from "../_components/AppHeader";
import { Alert } from "../_components";
export default async function AuthenticationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
	try{
	let { id } = auth.verifyToken();
	await userController.getByUUID(id).then((v)=>{
        if(!v){
            throw "not found user"
        }
    })
	}catch(e){
		console.log(e)
        redirect("/")
    }
    return <div className="h-100 w-100 ">
        <AppHeader redirect={true} />
        <Alert />
        {children}
    </div>
}
