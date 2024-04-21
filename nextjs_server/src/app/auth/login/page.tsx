
export default function LoginPage(){
    return(
        <form className="form-signin center" role="form" action={`http://${process.env.APIHOST}/api/authenticate`} method="post">
            <h2 className="form-signin-heading">
                <i className="fa fa-comments-o">
                { process.env.CHATAPPNAME }
                </i>
            </h2>
            <input type="email" name="email" className="form-control" placeholder="Email address" required autoFocus></input>
            <input type="password" name="password" className="form-control" placeholder="Password" required></input>
            <br/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <br/>
            <a className="lead pull-right" href="/auth/signup">Sign up</a>
        </form>
    )
}