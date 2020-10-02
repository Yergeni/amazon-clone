import React from "react";

import BasketActionTypes from "../../state/types/basket.types";
import { useStateValue } from "../../state/providers/State.provider";

import ProductRating from "../product-rating/ProductRating.component";

import "./Product.styles.css";

function Product({ id, title, image, price, rating }) {
	const [ _, dispatch] = useStateValue();

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
				rating: rating
			}
		})
	}

	return (
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
	);
}

export default Product;
