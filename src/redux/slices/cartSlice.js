import { createSlice } from "@reduxjs/toolkit"
import { getUserCart, removeCart, addCart } from './../thunks/cartThunks';



const updateLocalStorageDataField = (updatedData) => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'))
    if (storedProfile) {
        const updatedProfile = {...storedProfile, data: updatedData, }
        localStorage.setItem('profile', JSON.stringify(updatedProfile))
    } else {
        console.log('No profile data found in localStorage.')
    }
}
        



const addAsyncThunkCases = (builder, asyncThunk, stateKey, options = {}) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.cartLoading = true
            state.cartError = null
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {

            state.cartLoading = false
            state.cartError = null

            switch (stateKey) {
                case "addCart": 
                    updateLocalStorageDataField({...action?.payload?.data})
                    break
                case "getUserCart": 
                    state.cartDetails = action?.payload?.data
                    break
                case "removeCart": 
                    state.cartDetails = action?.payload?.data
                    break
                
                default:
                    break
            }

        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state.cartLoading = false
            state.cartError = action?.payload || 'Something went wrong'   

        })
}

const initialState = {
    cartLoading: false,
    cartError: '', 
    cartDetails: {},
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        addAsyncThunkCases(builder, getUserCart , "getUserCart")
        addAsyncThunkCases(builder, removeCart , "removeCart")
        addAsyncThunkCases(builder, addCart , "addCart")

    }
})



export const cartThunks = cartSlice.actions
export default cartSlice.reducer