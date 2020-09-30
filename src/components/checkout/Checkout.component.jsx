import React from "react";

import Subtotal from "../subtotal/Subtotal.component";

import "./Checkout.styles.css";

function Checkout() {
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
                </div>
			</div>
            {/* Right Side */}
			<div className="checkout__right">
                {/* <h2>The subtotal goes here</h2> */}
                <Subtotal />
                
            </div>
		</div>
	);
}

export default Checkout;
