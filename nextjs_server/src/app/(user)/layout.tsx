'use client'
import { Alert } from "@/app/_components";
import AppHeader from "../_components/AppHeader";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
export default function AuthenticationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="h-100 w-100 ">
        <AppHeader redirect={true} />
        <Alert />
        {children}
        <ToastContainer />
    </div>
}