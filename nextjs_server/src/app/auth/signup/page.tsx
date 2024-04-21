export default function SignupPage() {
	return (
		<form
			className="form-signin"
			role="form"
			action={`http://${process.env.APIHOST}/api/signup`}
			method="post"
		>
			<h2 className="form-signin-heading">
				<i className="fa fa-comments-o">{process.env.CHATAPPNAME}</i>
			</h2>
			<div className="lead">Sign up for an account below</div>
			<input
				id="name"
				type="text"
				name="name"
				className="form-control"
				placeholder="Name"
				required
				autoFocus
			></input>
			<input
				type="email"
				name="email"
				className="form-control"
				placeholder="Email address"
				required
			></input>
			<input
				type="password"
				name="password"
				className="form-control"
				placeholder="Password"
				required
			></input>
			<button className="btn btn-lg btn-primary btn-block" type="submit">
				Sign up
			</button>
		</form>
	);
}
