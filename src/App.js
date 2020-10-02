import React, { useEffect } from "react";

import { auth } from "./firebase";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login/Login.component";
import Header from "./components/header/Header.component";
import Home from "./components/home/Home.component";
import Checkout from "./components/checkout/Checkout.component";

import UserActionTypes from "./state/types/user.types";
import { useStateValue } from "./state/providers/State.provider";

import "./App.css";

function App() {
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		// Observer for listening to the user auth states every time the app 
		const unsusbscribe = auth.onAuthStateChanged((authUser) => {
			console.log("This is the user >>> ", authUser);

			if (authUser) {
				dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: authUser });
			} else {
				// No user
				dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: null });
			}
		});

		return () => unsusbscribe();
	}, [dispatch]);

	return (
		<Router>
			<div className="App">
				<Switch>
					{/* Login */}
					<Route exact path="/login">
						<Login />
					</Route>

					{/* Home */}
					<Route exact path="/">
						{/* Header */}
						<Header />
						<Home />
					</Route>

					{/* Checkout */}
					<Route exact path="/checkout">
						{/* Header */}
						<Header />
						<Checkout />
					</Route>

					{/* Not Found */}
					<Route>
						{/* TODO */}
						<h1>Not found Page</h1>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
