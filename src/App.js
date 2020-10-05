import React, { useEffect } from "react";

import { auth } from "./firebase";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login/Login.component";
import Header from "./components/header/Header.component";
import Home from "./components/home/Home.component";
import Checkout from "./components/checkout/Checkout.component";
import Payment from "./components/payment/Payment.component";
import Orders from "./components/orders/Orders.component";

import UserActionTypes from "./state/types/user.types";
import { useStateValue } from "./state/providers/State.provider";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";

const stripePromise = loadStripe(
	"pk_test_51HOVT8BETI3Lr3veD7H2phQJ7xObvi8XiLcztzgWP60uQveICvsUvttlCIj6MTUvcO5Npu8OGx1P84fGRJIeL4CV00gPdY0R6R"
);

function App() {
	const [, dispatch] = useStateValue();

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
    // Unsusbscribe to the observer
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

					{/* Payment */}
					<Route exact path="/payment">
						{/* Header */}
						<Header />
            {/* Loading stripe on the payment page */}
            <Elements stripe={stripePromise}>
						  <Payment />
            </Elements>
					</Route>

          {/* Orders */}
					<Route exact path="/orders">
						{/* Header */}
						<Header />
						<Orders />
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
