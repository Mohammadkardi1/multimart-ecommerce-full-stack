import { createSlice } from "@reduxjs/toolkit"
import { registerUser, verifyEmail, loginUser } from './../thunks/authThunks';



const addAsyncThunkCases = (builder, asyncThunk, stateKey, options = {}) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            console.log("pending is running")

            state.authLoading = true
            state.authError = null

        })
        .addCase(asyncThunk.fulfilled, (state, action) => { 
            console.log("fulfilled is running")

            state.authLoading = false
            state.authError = null
            switch (stateKey) {
                case "verifyEmail":
                    state.isVerified = true
                    break
                case "login": 
                    state.loggedInUser = action?.payload.data
                    localStorage.setItem('profile', JSON.stringify({...action?.payload}))
                    break
                default:
                    break;
            }
        })
        .addCase(asyncThunk.rejected, (state, action) => {
            console.log("rejected is running")

            state.authLoading = false
            state.authError = action?.payload || 'Something went wrong'         
            switch (stateKey) {
                case "verifyEmail":
                    state.isVerified = false
                    break
                default:
                    break;
            }
        })
}

const initialState = {
    loggedInUser: {},
    authLoading: false,
    isVerified: false,
    authError: '', 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.authError = ''
        },
        logout: (state) => {
            localStorage.clear()
            state.loggedInUser = null
        },
        loginByToken: (state) => {
            state.loggedInUser = JSON.parse(localStorage.getItem('profile')).data
        },
        setLoading: (state, authLoading) => {
            state.authLoading = authLoading
        },
        syncLocalStorage: (state) => {
            const storedProfile = localStorage.getItem('profile')
            state.loggedInUser = JSON.parse(storedProfile)?.data
        },

    },
    extraReducers: (builder) => {
        addAsyncThunkCases(builder, registerUser, "registerUser")
        addAsyncThunkCases(builder, loginUser, "login")
        addAsyncThunkCases(builder, verifyEmail, "verifyEmail")

    }
})

export const authThunks = authSlice.actions
export default authSlice.reducer



