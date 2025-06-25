const initialState = {
    products: []
}
const ProductReducer = (state = initialState, action) => {

    if (action.type === "SET_PRODUCT_DETAILS") {
        let products = action.payload;
        return {
            ...state,
            products
        }
    }

    return state;
}
export default ProductReducer;

