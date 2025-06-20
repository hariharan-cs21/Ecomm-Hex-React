import axios from "axios"


// export const getCartSize = (dispatch) => (cartItems) => {

//     const size = cartItems.length
//     dispatch({
//         type: "GET_CART_SIZE",
//         payload: size
//     })
// }

export const setCart = (dispatch) => (token) => {
    axios.get("http://localhost:8080/api/cart/items", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            const items = res.data;

            dispatch({
                type: "SET_CART_ITEMS",
                payload: items
            });

            dispatch({
                type: "GET_CART_SIZE",
                payload: items.length
            });
        })
};
