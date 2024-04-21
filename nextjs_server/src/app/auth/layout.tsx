export default function AuthenticationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>){
    return <div className="container d-flex align-items-center justify-content-center h-100">
        {children}
    </div>
}