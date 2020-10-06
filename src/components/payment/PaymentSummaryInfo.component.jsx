import React from "react";
import CurrencyFormat from "react-currency-format";

function PaymentSummaryInfo({ title, passedValue }) {
	return (
		<div>
			<CurrencyFormat
				renderText={(value) => (
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
                            marginBottom: '2px'
						}}
					>
						<p>{title}</p>
						<strong>{value}</strong>
					</div>
				)}
				decimalScale={2}
				fixedDecimalScale={true}
				value={passedValue}
				displayType="text"
				thousandSeparator={true}
				prefix="$"
			/>
		</div>
	);
}

export default PaymentSummaryInfo;
