// Basket utils
 
/**
 * Get the total value of the bascket
 */
export const getBasketTotalValue = (basket) =>
	basket?.reduce((sum, item) => item.price + sum, 0);
