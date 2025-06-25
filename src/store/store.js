import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./reducers/CartReducer";
import UserReducer from "./reducers/UserReducer";
import ProductReducer from "./reducers/ProductReducer";

const store = configureStore({
    reducer: {
        cart: CartReducer,
        user: UserReducer,
        products: ProductReducer
    }
})
export default store