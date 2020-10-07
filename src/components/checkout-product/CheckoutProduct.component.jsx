import React from "react";

import { useStateValue } from "../../state/providers/State.provider";
import BasketActionTypes from "../../state/types/basket.types";

import ProductRating from "../product-rating/ProductRating.component";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import "./CheckoutProduct.styles.css";

function CheckoutProduct({
	id,
	title,
	image,
	price,
	rating,
	quantity,
	hideBtn,
}) {
	const [, dispatch] = useStateValue();

	// Add to basket
	const addItemToBasket = () => {
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
	};

	// Add to basket
	const removeItemFromBasket = () => {
		// dispatch the item into the data layer (context)
		dispatch({
			type: BasketActionTypes.REMOVE_FROM_BASKET,
			payload: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
				quantity: quantity,
			},
		});
	};

	// Add to basket
	const clearItemFromBasket = () => {
		// dispatch the item into the data layer (context)
		dispatch({
			type: BasketActionTypes.CLEAR_ITEM_FROM_BASKET,
			payload: { id: id },
		});
	};

	return (
		<div className="checkoutProduct">
			<img className="checkoutProduct__image" src={image} alt={title} />

			<div className="checkoutProduct__info">
				<p className="checkoutProduct__title">{title}</p>
				<p className="checkoutProduct__price">
					<strong>$</strong>
					<strong>{price}</strong>
					{/* <strong>{price}{quantity > 1 && ` x ${quantity}`}</strong> */}
				</p>
				<p style={{ marginBottom: "5px", fontWeight: "500" }}>
					<small>{`Ordered Items: ${quantity}`}</small>
				</p>
				<ProductRating rating={rating} />
				{!hideBtn ? (
					<div className="checkoutProduct__quantity">
						<ArrowBackIosIcon
							fontSize="small"
							style={{ cursor: "pointer" }}
							onClick={removeItemFromBasket}
						/>
						<p>{quantity}</p>
						<ArrowForwardIosIcon
							fontSize="small"
							style={{ cursor: "pointer" }}
							onClick={addItemToBasket}
						/>
					</div>
				) : null}
				{!hideBtn && (
					<button onClick={clearItemFromBasket}>Remove from Basket</button>
				)}
			</div>
		</div>
	);
}

export default CheckoutProduct;
