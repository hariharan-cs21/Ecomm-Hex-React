import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./reducers/CartReducer";

const store = configureStore({
    reducer: {
        cart: CartReducer
    }
})
export default store