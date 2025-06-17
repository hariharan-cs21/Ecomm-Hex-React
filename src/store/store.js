import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./reducers/CartReducer";
import UserReducer from "./reducers/UserReducer";

const store = configureStore({
    reducer: {
        cart: CartReducer,
        user: UserReducer
    }
})
export default store