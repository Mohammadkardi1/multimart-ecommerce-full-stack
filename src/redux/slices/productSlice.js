import { createSlice } from "@reduxjs/toolkit"
import { addProduct, getTrendingProducts, getBestSalesProducts, getMobileProducts, 
        getWirelessProducts, getPopularProducts, getFilteredProducts, getProductByID, deleteProduct } from './../thunks/productThunks';



const updateLocalStorageDataField = (updatedData) => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'))

    if (storedProfile?.data?.role === 'Seller') { // Only seller view mode
        if (storedProfile) {
            const updatedProfile = {...storedProfile, data: updatedData, }
            localStorage.setItem('profile', JSON.stringify(updatedProfile))
        } else {
            console.log('No profile data found in localStorage.')
        }
    }
}
        



const addAsyncThunkCases = (builder, asyncThunk, stateKey, options = {}) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.productLoading = true
            state.productError = null
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
                    updateLocalStorageDataField({...action?.payload?.data})
                    break
                case "deleteProduct":
                    updateLocalStorageDataField({...action?.payload?.data})
                    break
    
                case "getFilteredProducts": 
                    state.products = action?.payload?.data
                    break         
                case "getProductByID":
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
            state.productLoading = false
            state.productError = action?.payload || 'Something went wrong'   

        })
}

const initialState = {
    productLoading: false,
    productError: '',

    
    trendingProducts: [], bestSalesProducts: [], mobileProducts: [], wirelessProducts: [], popularProducts: [],


    products: [],

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
        addAsyncThunkCases(builder, getFilteredProducts, "getFilteredProducts")
        addAsyncThunkCases(builder, getProductByID, "getProductByID")
        addAsyncThunkCases(builder, deleteProduct, "deleteProduct")


    }
})



export const productThunks = productSlice.actions
export default productSlice.reducer