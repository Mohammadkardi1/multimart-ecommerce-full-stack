import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import CartSlice from "./slices/CartSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: CartSlice, 
        
    }
})

export default store


