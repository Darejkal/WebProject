import { Alert } from "@/app/_components";

export default function AuthenticationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>){
    return <div className="h-100 w-100 ">
        <Alert />
        {children}
    </div>
}