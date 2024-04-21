import { Fragment } from "react";
export default function ChatLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<ChatNavBar />
			{/* <div className="max-w-screen-xl mx-auto">{children}</div> */}
		</div>
	);
}
export function ChatNavBar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<a className="navbar-brand" href="/">
						<i className="fa fa-comments-o mx-1"></i>
						<span>{process.env.CHATAPPNAME}</span>
					</a>
				<div className="navbar-collapse collapse" id="navbarSupportedContent">
					<ul className="nav navbar-nav">
						<li className="nav-item">
							<a href="/" className="nav-link">Home</a>
						</li>
					</ul>
					<ul className="nav navbar-nav ms-auto">
						<li className="nav-item">
							<a href="/auth/login" className="nav-link">Login</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
