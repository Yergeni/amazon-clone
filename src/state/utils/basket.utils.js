// Basket utils

/**
 * Get the total value of the bascket
 */
export const getBasketTotalValue = (basket) =>
	basket?.reduce((sum, item) => item.price * item.quantity + sum, 0);

/**
 * Get the total value of the bascket
 */
export const getBasketNumberOfItems = (basket) =>
	basket?.reduce((numberOfItems, item) => item.quantity + numberOfItems, 0);

/**
 * Add an item to the basket (global state) or increment its quantity if exist
 * @param {array} basket The basket objet from the global state
 * @param {object} itemToAdd The item to be added on the basket
 */
export const addItemToBasket = (basket, itemToAdd) => {
	const existingItem = basket.find((item) => item.id === itemToAdd.id);

	if (existingItem) {
		return basket.map(
			(item) =>
				item.id === itemToAdd.id
					? { ...item, quantity: item.quantity + 1 } // Increase the quantity of the item already in basket
					: item // otherwise return the item to be added
		);
	}

	// Otherwise add new item to basket with quantity 1
	return [...basket, { ...itemToAdd, quantity: 1 }];
};

export const removeItemFromBasket = (basket, itemToDecrease) => {
	const existingItem = basket.find((item) => item.id === itemToDecrease.id);

	if (existingItem.quantity === 1) {
		// If quantity is 1 then remove the item from basket
		return basket.filter((item) => item.id !== itemToDecrease.id);
	}

	// Otherwise
	return basket.map(
		(item) =>
			item.id === itemToDecrease.id
				? { ...item, quantity: item.quantity - 1 } // Decrease the quantity of the item already in basket
				: item // otherwise return the item to be added
	);
};
