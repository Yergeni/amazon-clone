import BasketActionTypes from "../types/basket.types";
import UserActionTypes from "../types/user.types";

import { addItemToBasket, removeItemFromBasket } from "../utils/basket.utils";

// Insital state of the application
export const initialState = {
	basket: [],
	subTotal: 0,
	user: null,
};

// Reducer of the application.
const reducer = (state, action) => {
	switch (action.type) {
		case BasketActionTypes.ADD_TO_BASKET:
			return {
				...state,
				basket: addItemToBasket(state.basket, action.payload),
			};
		case BasketActionTypes.REMOVE_FROM_BASKET:
			return {
				...state,
				basket: removeItemFromBasket(state.basket, action.payload),
			};
		case BasketActionTypes.CLEAR_ITEM_FROM_BASKET:
			return {
				...state,
				basket: state.basket.filter((item) => item.id !== action.payload.id), // return all items in basket except the one on payload
			};
		case BasketActionTypes.CLEAR_BASKET:
			return {
				...state,
				basket: []
			};
		case UserActionTypes.SET_CURRENT_USER:
			return {
				...state,
				user: action.payload
			}

		default:
			return state;
	}
};

export default reducer;
