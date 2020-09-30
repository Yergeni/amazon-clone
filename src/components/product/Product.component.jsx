import React from "react";

import BasketActionTypes from "../../state/types/basket.types";
import { useStateValue } from "../../state/providers/State.provider";

import StarIcon from "@material-ui/icons/Star";

import "./Product.styles.css";

function Product({ id, title, image, price, rating }) {
	const [_, dispatch] = useStateValue();

	// console.log('Basket state: ', basket);
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
				<div className="product__rating">
					<div className="product__ratingRated">
						{Array(rating)
							.fill()
							.map((_, i) => (
								<StarIcon key={i} fontSize="small" />
							))}
					</div>
					<div className="product__ratingNotRated">
						{rating && Number(rating) !== 5
							? Array(Number(5 - rating))
									.fill()
									.map((_, i) => <StarIcon key={i} fontSize="small" color="disabled" />)
							: null}
					</div>
				</div>
			</div>

			<img src={image} alt={title} />

			<button onClick={addToBasket}>Add to Basket</button>
		</div>
	);
}

export default Product;
