const initialState = {
    items: [],
    cartSize: 0
};
const CartReducer = (state = initialState, action) => {
    if (action.type === "GET_CART_SIZE") {
        return {
            ...state,
            cartSize: action.payload
        }
    }
    if (action.type === "SET_CART_ITEMS") {
        return {
            ...state,
            items: action.payload
        }
    }
    return state
}
export default CartReducer