import { createSlice } from "@reduxjs/toolkit"
import { addProduct } from './../thunks/productThunks';




// const updateLocalStorageDataField = (updatedData) => {
//     const storedProfile = JSON.parse(localStorage.getItem('profile'))

//     if (storedProfile?.data?.role === 'Seller') {
//         if (storedProfile) {
//             const updatedProfile = {
//                 ...storedProfile,
//                 data: updatedData, 
//             }
//             localStorage.setItem('profile', JSON.stringify(updatedProfile));
//         } else {
//             console.log('No profile data found in localStorage.')
//         }
//     }
// }


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


                // case "fetchProduct": 
                //     state.product = action?.payload?.data
                //     break
                
                
                // case "fetchProducts": 
                //     state.products = action?.payload?.data
                //     break


                // case "deleteProduct": 
                //     localStorage.clear()
                //     break

                // case "submitReview": 
                //     state.product = action?.payload?.data
                //     updateLocalStorageDataField({...action?.payload?.data})
                //     break

                // case "searchProducts":
                //     state.products = action?.payload?.data
                //     break

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
    reviewLoading: '',
    productError: '',
    reviewError: '',
    products: [],
    product: {}
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


    }
})



export const productThunks = productSlice.actions
export default productSlice.reducer