import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,        
        product: productSlice,
        cart: cartSlice,

    }
})

export default store


