import React from "react";

import { useStateValue } from "../../state/providers/State.provider";
import { getBasketTotalValue, getBasketNumberOfItems } from "../../state/utils/basket.utils";

import CurrencyFormat from "react-currency-format";

import "./Subtotal.styles.css";

function Subtotal() {
	const [{ basket }] = useStateValue();

	return (
		<div className="subtotal">

			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({getBasketNumberOfItems(basket)} items): <strong>{value}</strong>
						</p>
						<small className="subtotal__gift">
							<input type="checkbox" />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotalValue(basket)}
				displayType="text"
				thousandSeparator={true}
				prefix="$"
			/>

			<button>Proceed to Checkout</button>
		</div>
	);
}

export default Subtotal;
