"use server";

import { auth, userController } from "@/app/_helpers/server";
import { notFound, redirect } from "next/navigation";
import AppHeader from "../_components/AppHeader";
import AppFooter from "../_components/AppFooter";

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
    return (
<>
        <AppHeader redirect={true} />
        <div style={{flex:1}}>{children}</div>
		<AppFooter/>
    </>
    )
}
