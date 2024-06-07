import AppFooter from "../_components/AppFooter";
import AppHeader from "../_components/AppHeader";

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
