import { Alert } from "@/app/_components";

export default function AuthenticationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>){
    return <div className="container">
        <Alert />
        {children}
    </div>
}