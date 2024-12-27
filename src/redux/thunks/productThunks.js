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


export const getTrendingProducts = createAsyncThunk('product/getTrendingProducts', async (count, { rejectWithValue }) => {
  try {
    return await productAPI.getRandomProducts(count).then((response) => response.data) 
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong") 
  }
})

export const getBestSalesProducts = createAsyncThunk('product/getBestSalesProducts', async (count, {rejectWithValue}) => {
  try {
    return await productAPI.getRandomProducts(count).then((response) => response.data)
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong") 
  }
})

export const getMobileProducts = createAsyncThunk('product/getMobileProducts', async (count, {rejectWithValue}) => {
  try {
    return await productAPI.getRandomProducts(count).then((response) => response.data)
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong") 
  }
})

export const getWirelessProducts = createAsyncThunk('product/getWirelessProducts', async (count, {rejectWithValue}) => {
  try {
    return await productAPI.getRandomProducts(count).then((response) => response.data)
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong") 
  }
})

export const getPopularProducts = createAsyncThunk('product/getPopularProducts', async (count, {rejectWithValue}) => {
  try {
    return await productAPI.getRandomProducts(count).then((response) => response.data)
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong") 
  }
})

export const getFilteredProducts = createAsyncThunk('product/filteredProducts', async (queryParams, {rejectWithValue}) => {
  try {
    return await productAPI.filteredProducts(queryParams).then((response) => response.data)
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong") 
  }
})