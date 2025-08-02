import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slice/authSlice'
import forgetPasswordReducer from "../redux/slice/forgetPasswordSlice"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        forgetPassword: forgetPasswordReducer
    }
})