import React from "react";

import StarIcon from "@material-ui/icons/Star";

import "./ProductRating.styles.css";

function ProductRating({ rating }) {
	return (
		<div className="product__rating">
			{/* Rated Starts */}
			<div className="product__ratingRated">
				{Array(rating)
					.fill()
					.map((_, i) => (
						<StarIcon key={i} fontSize="small" />
					))}
			</div>
			{/* Not Rated Starts */}
			<div className="product__ratingNotRated">
				{Array(Number(5 - rating))
					.fill()
					.map((_, i) => (
						<StarIcon key={i} fontSize="small" color="disabled" />
					))}
			</div>
		</div>
	);
}

export default ProductRating;
