// @ts-ignore
import "./style.css"
import { Be_Vietnam_Pro } from "next/font/google";
import { UserStoreProvider } from "./_services";
import AppHeader from "./_components/AppHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "react-bootstrap";
const inter = Be_Vietnam_Pro({ weight: ["400","500","600", "700"], subsets: ["latin"] });
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-100 w-100">
			<head>
				<meta charSet="utf-8"></meta>
				<meta httpEquiv="X-UA-Compatible" content="IE=9"></meta>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				></meta>
				<title>{process.env.APPNAME}</title>
				<link href="/static/css/bootstrap.min.css" rel="stylesheet"></link>
				<link href="/static/css/font-awesome.min.css" rel="stylesheet"></link>
			</head>
			<body className={inter.className + " h-100 w-100"}>
				<div className="h-100 w-100">
					<UserStoreProvider>
						{children}
					<ToastContainer />
					</UserStoreProvider>
				</div>
				<script src="/static/js/jquery-2.1.1.min.js"></script>
				<script src="/static/js/bootstrap.min.js"></script>
			</body>
		</html>
	);
}
