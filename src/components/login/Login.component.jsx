import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { auth } from "../../firebase";

import "./Login.styles.css";

function Login() {
	const history = useHistory();
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = (e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.then((authResponse) => history.push(location.state.goto || "/")) // if the location state is set then, use the goto path
			.catch((err) => console.error(err.message));
	};

	const handleRegister = (e) => {
		e.preventDefault();

		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authResponse) => {
				// console.log("User created >>> ", authResponse);
				if (authResponse) history.push("/");
			})
			.catch((err) => {
				console.error(err.message);
			});
	};

	return (
		<div className="login">
			<Link to="/">
				<img
					className="login__logo"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
					alt="Amazon Logo"
				/>
			</Link>

			<div className="login__container">
				<h1>Sign-in</h1>
				<form action="">
					<h5>E-mail</h5>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<h5>Password</h5>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button className="login__signInButton" onClick={handleSignIn}>
						Sing In
					</button>
				</form>
				<p>
					By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
					Sales.
				</p>

				<button className="login__registerButton" onClick={handleRegister}>
					Create you Amazon Account
				</button>
			</div>
		</div>
	);
}

export default Login;
