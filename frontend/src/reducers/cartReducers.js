import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            //Boolean. Does item already exist in cart? Uses IDs
            const existItem = state.cartItems.find(x => x.product === item.product);
            if (existItem) {
                //map through the cardItems array, and replace the matching product with the new item, leave the rest products as they were
                return { ...state, cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x) }
            } else {
                //return a new cardItems array with the previous products spread and add the new item
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        default:
            return state
    }
}