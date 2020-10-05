import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";

import "./Orders.styles.css";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        try {
            firestore
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    })))
                ))
        } catch (error) {
            
        }
    }, [])

	return (
		<div className="orders">
			<h1>Your Orders</h1>
		</div>
	);
}

export default Orders;
