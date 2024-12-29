import { createAsyncThunk } from "@reduxjs/toolkit"
import { cartAPI } from "../../api/API"


export const addCart = createAsyncThunk('cart/addCart', async (cartInfo, { rejectWithValue }) => {
    try {
        return await cartAPI.addCart(cartInfo).then((response) => response.data) 
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Something went wrong") 
    }
})

export const removeCart = createAsyncThunk('cart/removeCart', async (productID, { rejectWithValue }) => {
    try {
      return await cartAPI.removeCart(productID).then((response) => response.data) 
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Something went wrong") 
    }
})