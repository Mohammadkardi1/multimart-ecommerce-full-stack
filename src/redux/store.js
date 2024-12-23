import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import CartSlice from "./slices/CartSlice";
import productSlice from "./slices/productSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,        
        product: productSlice,
        cart: CartSlice,

    }
})

export default store


