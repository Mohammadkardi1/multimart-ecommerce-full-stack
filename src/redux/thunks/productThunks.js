import { createAsyncThunk } from "@reduxjs/toolkit"
import { productAPI } from "../../api/API"



export const addProduct = createAsyncThunk('product/addProduct', async (productInfo, { rejectWithValue }) => {
  try {
    return await productAPI.addProduct(productInfo).then((response) => response.data) 
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong") 
  }
}
)