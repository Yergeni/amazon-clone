import React from "react";
import { useStateValue } from "../../state/providers/State.provider";
import CheckoutProduct from "../checkout-product/CheckoutProduct.component";

import Subtotal from "../subtotal/Subtotal.component";

import "./Checkout.styles.css";

function Checkout() {
	const [{ basket }] = useStateValue();

	return (
		<div className="checkout">
			{/* Left Side */}
			<div className="checkout__left">
				<img
					className="checkout__ad"
					src="https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2020/Q3_Fall/deals/Hero_desktop_05.jpg"
					alt=""
				/>
				<div>
					<h2 className="checkout__title">Your Shopping Basket</h2>
					{/* Basket Items */}
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
					{/* <CheckoutProduct
						key="12121212"
						title="LoremLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum"
						image={
							"https://images-na.ssl-images-amazon.com/images/I/61WKkuufjBL._AC_SL1500_.jpg"
						}
						price={99.99}
						rating={4}
						quantity={2}
					/>
					<CheckoutProduct
						key="12121232"
						title="LoremLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum"
						image={
							"https://images-na.ssl-images-amazon.com/images/I/61WKkuufjBL._AC_SL1500_.jpg"
						}
						price={99.99}
						rating={4}
						quantity={1}
					/> */}
				</div>
			</div>
			{/* Right Side */}
			<div className="checkout__right">
				<Subtotal />
			</div>
		</div>
	);
}

export default Checkout;
