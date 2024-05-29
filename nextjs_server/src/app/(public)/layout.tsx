"use client";
import { Alert } from "@/app/_components";
import AppHeader from "../_components/AppHeader";
export default function AuthenticationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="h-100 w-100 ">
			<AppHeader redirect={false} />
			{children}
		</div>
	);
}
