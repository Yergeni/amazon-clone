import React, { useEffect, useState } from "react";
import { useStateValue } from "../../state/providers/State.provider";

import { firestore } from "../../firebase";

import OrderItem from "../order-item/OrderItem.component";

import "./Orders.styles.css";

function Orders() {
	const [{ user }] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		let unsubscribe = () => {};
		if (user) {
			unsubscribe = firestore
				.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.orderBy("created", "desc")
				.onSnapshot((snapshot) =>
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);
		} else {
			setOrders([]);
		}

		return () => unsubscribe();
	}, [user]);

	return (
		<div className="orders">
			<h1>Your Orders</h1>

			<div className="orders__order">
				{orders?.map((order) => (
					<OrderItem key={order.id} order={order} />
				))}
			</div>
		</div>
	);
}

export default Orders;
