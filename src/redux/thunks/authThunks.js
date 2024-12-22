import { createAsyncThunk } from "@reduxjs/toolkit"
import { authAPI } from "../../api/API"



export const registerUser = createAsyncThunk('auth/registerUser', async (userInfo, { rejectWithValue }) => {
  try {
    return await authAPI.registerUser(userInfo).then((response) => response.data) 
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong") 
  }
}
)


export const loginUser = createAsyncThunk('auth/loginUser', async(userInfo, { rejectWithValue }) => {
  try {
    return await authAPI.loginUser(userInfo).then((response) => response.data)
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong")
  }
})

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async(userInfo, {rejectWithValue}) => {
  try {
    return await authAPI.verifyEmail(userInfo).then((response) => response.data)
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong")
  }
})