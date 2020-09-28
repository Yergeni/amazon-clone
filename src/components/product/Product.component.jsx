import React from "react";

import StarIcon from "@material-ui/icons/Star";

import "./Product.styles.css";

function Product({ title, image, price, rating, alt }) {
	// function painRating(rating) {
	//     let stars = [];
	//     for (let r = 0; r < rating; r++) {
	//         stars.push(<StarIcon fontSize="small" />);
	//     }

	//     return stars
	// }

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

			<button>Add to Basket</button>
		</div>
	);
}

export default Product;
