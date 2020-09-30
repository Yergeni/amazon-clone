import BasketActionTypes from '../types/basket.types';

// Insital state of the application
export const initialState = {
    basket: [],
    subTotal: 0,
};

// Reducer of the application.
const reducer = (state, action) => {
    console.log(action);
	switch (action.type) {
		case BasketActionTypes.ADD_TO_BASKET:
			return {
				...state,
				basket: [...state.basket, action.payload],
			};

		default:
			return state;
	}
};

export default reducer;
