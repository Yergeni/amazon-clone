import React from "react";

import BasketActionTypes from "../../state/types/basket.types";
import { useStateValue } from "../../state/providers/State.provider";

import ProductRating from "../product-rating/ProductRating.component";

import { store } from 'react-notifications-component';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';

import "./Product.styles.css";

function Product({ id, title, image, price, rating }) {
	const [, dispatch] = useStateValue();

	// Add to basket
	const addToBasket = () => {
		// dispatch the item into the data layer (context)
		dispatch({
			type: BasketActionTypes.ADD_TO_BASKET,
			payload: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			},
		});

		store.addNotification({
			message: (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<CheckCircleSharpIcon color="disabled" />
					<h3>Item Added!</h3>
				</div>
			),
			width: 180,
			type: "success",
			insert: "top",
			container: "top-right",
			// animationIn: ["animate__animated", "animate__fadeIn"],
			// animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
			  duration: 3000,
			  onScreen: true
			}
		});
	};

	return (
		<>
			<div className="product">
				<div className="product__info">
					<p>{title}</p>
					<p className="product__price">
						<small>$</small>
						<strong>{price}</strong>
					</p>
					<ProductRating rating={rating} />
				</div>

				<img src={image} alt={title} />

				<button onClick={addToBasket}>Add to Basket</button>
			</div>
		</>
	);
}

export default Product;
