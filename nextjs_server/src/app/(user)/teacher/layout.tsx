'use server'

import { auth, subjectInstanceController, } from "@/app/_helpers/server";
import { notFound, redirect } from "next/navigation";

export default async function AuthenticationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>){
    try{
        let {id}=auth.verifyToken()
        let flag= await subjectInstanceController.doesUserHaveRole(id,"teacher")
        if(!flag){
            return notFound()
        }
    } catch (e){
        return notFound()
    }
    return <>
        {children}
    </>
}