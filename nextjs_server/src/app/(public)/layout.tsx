"use client";
import { Alert } from "@/app/_components";
import AppHeader from "../_components/AppHeader";
import AppFooter from "../_components/AppFooter";
export default function AuthenticationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
<>
        <AppHeader redirect={true} />
        <div style={{flex:1}}>{children}</div>
		<AppFooter/>
    </>
		
	);
}
