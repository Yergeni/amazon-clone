import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useStateValue } from "../../state/providers/State.provider";
import BasketActionTypes from "../../state/types/basket.types";

import CheckoutProduct from "../checkout-product/CheckoutProduct.component";
import CurrencyFormat from "react-currency-format";
import PaymentSummaryInfo from "./PaymentSummaryInfo.component";

import {
	getBasketNumberOfItems,
	getBasketTotalValue,
} from "../../state/utils/basket.utils";
import stripeCloudAxiosInstance from "../../stripe/stripe.utils";

// Stripe hooks
import { useElements, useStripe, CardElement} from "@stripe/react-stripe-js";
// Firestore cloud DB
import { firestore } from "../../firebase";

import "./Payment.styles.css";

function Payment() {
	const history = useHistory();
	// Stripe hooks
	const stripe = useStripe();
	const elements = useElements();

	// STATEs
	const [{ basket, user }, dispatch] = useStateValue();
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	// Pay Now button states
	const [processing, setProcessing] = useState(false);
	const [succeded, setSucceded] = useState(false);
	// Order summaru values (TODO: make it on the context API state)
	const deliverAndHandling = getBasketTotalValue(basket) * 0.02; //Simulated
	const estimatedTaxes = getBasketTotalValue(basket) * 0.06; //Simulated
	const total =
		getBasketTotalValue(basket) + deliverAndHandling + estimatedTaxes;
	// Stripe
	const [clientSecret, setClientSecret] = useState(true);

	// GET STRIPE SECRET ON MOUNTING
	useEffect(() => {
		if (total !== 0) {
			// Generates the special stripe secret which allow us to charge customers
			const getClientSecret = async () => {
				const response = await stripeCloudAxiosInstance({
					method: "post",
					// Stripe expects the total in currencies subunits (cents)
					// url: `/payments/create?total=${Math.trunc(total * 100)}&customer=${user?.email}`,
					url: `/payments/create?total=${Math.trunc(total * 100)}`,
				});

				// The response should have the stripe secret from the cloud function deployed from here to firebase
				setClientSecret(response.data.clientSecret);
			};

			// Wait to make asyn functions on useEffect Hook
			getClientSecret();
		} else {
			history.replace("/checkout");
		}
	}, [total, history, user]); // fire everytime the basket value changes

	// Secret key from stripe function in firebase
	// console.log("The secret is >>> ", clientSecret);

	// Handle Payment Card Change
	const handleCardChange = (event) => {
		console.log(event.complete);
		// listen for changes in the CartElement and display any errors as the customer types their card
		setDisabled(!event.complete); // enable the pay now button if the CardElement is filled completelly
		setError(event.error ? event.error.message : "");
	};

	// HANDLE PAYMENT (https://stripe.com/docs/stripe-js/react)
	const handleStripePayment = async (event) => {
		// Block native form submission.
		event.preventDefault();

		// Made the button disabled (avoid user to click ir again)
		setProcessing(true);

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const cardElement = elements.getElement(CardElement);

		if (error) {
			alert(error);
			return;
		}

		// Use your card Element with other Stripe.js APIs
		await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: cardElement,
				},
			})
			.then(({ paymentIntent }) => {
				// store payments in firestore cloud DB
				firestore
					.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				// if payment was successfully confirmed by stripe
				setSucceded(true);
				setError(null);
				setProcessing(false);

				// Empty the basket
				dispatch({ type: BasketActionTypes.CLEAR_BASKET });
				// Send the user to the orders page
				history.replace("/orders");
			})
			.catch((err) => {
				// TODO: show notification. Use Material UI for it.
				alert("Oops! Something went wrong processing your payment");
				console.error("Stripe payment error >>> ", err);
				setProcessing(false);
				setError(err);
			});
	};

	return (
		<>
			<h1 className="payment__top">
				Checkout (
				<Link to="/checkout">{getBasketNumberOfItems(basket)} items</Link>)
			</h1>
			<div className="payment">
				<div className="payment__container">
					{/* Payment Section - Delivery address */}
					<div className="payment__section">
						<div className="payment__title">
							<h3>Delivery Address</h3>
						</div>
						<div className="payment__address">
							<p>{user?.email}</p>
							<p style={{ textTransform: "uppercase" }}>123 React ST NE</p>
							<p style={{ textTransform: "uppercase" }}>Naples, FL</p>
						</div>
					</div>

					{/* Payment Section - Payment Card */}
					<div className="payment__section">
						<div className="payment__title">
							<h3>Payment Method</h3>
						</div>
						<div className="payment__details">
							<p
								style={{
									fontSize: "10px",
									marginBottom: "10px",
									color: "rgb(177, 39, 4)",
								}}
							>
								<strong style={{ marginRight: "3px" }}>NOTE:</strong>Please use
								card 4242 4242 4242 4242
							</p>
							{/* https://stripe.com/docs/stripe-js/react#element-components */}
							{/* <CardNumberElement />
							<CardCvcElement />
							<CardExpiryElement /> */}
							<CardElement
								options={{
									style: {
										base: {
											fontSize: "16px",
											color: "#424770",
											"::placeholder": {
												color: "#aab7c4",
											},
										},
										invalid: {
											color: "#9e2146",
										},
									},
								}}
								onChange={handleCardChange}
							/>
						</div>
					</div>

					{/* Payment Section - Review items */}
					<div className="payment__itemsSection">
						<h3>Review Items & Delivery</h3>
						<div className="payment__items">
							{/* The current items */}
							{basket.map((item) => (
								<CheckoutProduct
									key={item.id}
									id={item.id}
									title={item.title}
									image={item.image}
									price={item.price}
									rating={item.rating}
									quantity={item.quantity}
								/>
							))}
						</div>
					</div>
				</div>

				{/* SUMARY CONTAINER (right side) */}
				<div className="payment__summaryContainer">
					{/* Order sumary - Place your order button */}
					<div className="payment__summarySection">
						<button
							onClick={handleStripePayment}
							disabled={processing || disabled || succeded}
						>
							<span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
							{/* Buy Now */}
						</button>
						{/* {error && <div>{error} error here</div>} */}
					</div>
					{/* Order sumary - summary */}
					<div className="payment__summarySection">
						<h3>Order Summary</h3>
						<div className="payment__orderSummary">
							<PaymentSummaryInfo
								title={`Subtotal (${getBasketNumberOfItems(basket)} items):`}
								passedValue={getBasketTotalValue(basket)}
							/>
							<PaymentSummaryInfo
								title="Delivery & handling"
								passedValue={deliverAndHandling}
							/>
							<PaymentSummaryInfo
								title="Total before taxes:"
								passedValue={getBasketTotalValue(basket) + deliverAndHandling}
							/>
							<PaymentSummaryInfo
								title="Estimated taxes:"
								passedValue={estimatedTaxes}
							/>
						</div>
					</div>
					{/* Order sumary - total */}
					<div className="payment__summarySection">
						<CurrencyFormat
							renderText={(value) => (
								<div
									style={{
										marginTop: "20px",
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "5px",
										color: "#B12704",
									}}
								>
									<h3>Order Total</h3>
									<strong>{value}</strong>
								</div>
							)}
							decimalScale={2}
							fixedDecimalScale={true}
							value={total}
							displayType="text"
							thousandSeparator={true}
							prefix="$"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Payment;
