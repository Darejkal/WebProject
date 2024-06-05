"use client";
import { Alert } from "@/app/_components";
import AppHeader from "../_components/AppHeader";
export default function AuthenticationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="h-100 w-100 " style={{margin: 0, padding: 0, boxSizing: 'border-box', display: 'grid', gridTemplateRows: 'auto 1fr', height: '100vh',}}>
			<div style={{ gridRow: 1 }}>
				<AppHeader redirect={false}/>
			</div>
			<div style={{ gridRow: 2, overflowY: 'auto', paddingBottom: '10%'}}>
				{children}
			</div>
		</div>
	);
}
