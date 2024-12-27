import { createSlice } from "@reduxjs/toolkit"
import { addProduct, getTrendingProducts, getBestSalesProducts, getMobileProducts, getWirelessProducts, getPopularProducts } from './../thunks/productThunks';




const addAsyncThunkCases = (builder, asyncThunk, stateKey, options = {}) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            if (stateKey !== 'submitReview') {
                state.productLoading = true
                state.productError = null
            } else {
                state.reviewLoading = true
                state.reviewError = null
            }
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
            if (stateKey !== 'submitReview') {
                state.productLoading = false
            } else {
                state.reviewLoading = false
            }
            state.productError = null

            switch (stateKey) {
                case "addProduct": 
                    state.product = action?.payload?.data
                    break
                case "getTrendingProducts": 
                    state.trendingProducts = action?.payload?.data
                    break
                case "getBestSalesProducts": 
                    state.bestSalesProducts = action?.payload?.data
                    break
                case "getMobileProducts": 
                    state.mobileProducts = action?.payload?.data
                    break
                case "getWirelessProducts": 
                    state.wirelessProducts = action?.payload?.data
                    break
                case "getPopularProducts": 
                    state.popularProducts = action?.payload?.data
                    break        
                    
                    
                default:
                    break
            }

        })
        .addCase(asyncThunk.rejected, (state, action) => {
            if (stateKey !== 'submitReview') {
                state.productLoading = false
                state.productError = action?.payload || 'Something went wrong'   
            } else {
                state.reviewLoading = false
                state.reviewError = action?.payload || 'Something went wrong'   
            }
        })
}

const initialState = {
    productLoading: false,
    productError: '',
    trendingProducts: [],
    bestSalesProducts: [],
    mobileProducts: [],
    wirelessProducts: [],
    popularProducts: [],


    products: [],
    reviewLoading: '',
    reviewError: '',
    product: {},
}


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setLoading: (state, productLoading) => {
            state.productLoading = productLoading
        },
    },
    extraReducers: (builder) => {
        addAsyncThunkCases(builder, addProduct, "addProduct")
        addAsyncThunkCases(builder, getTrendingProducts, "getTrendingProducts")
        addAsyncThunkCases(builder, getBestSalesProducts, "getBestSalesProducts")
        addAsyncThunkCases(builder, getMobileProducts, "getMobileProducts")
        addAsyncThunkCases(builder, getWirelessProducts, "getWirelessProducts")
        addAsyncThunkCases(builder, getPopularProducts, "getPopularProducts")

    }
})



export const productThunks = productSlice.actions
export default productSlice.reducer