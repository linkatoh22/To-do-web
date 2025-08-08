import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slice/authSlice'
import forgetPasswordReducer from "../redux/slice/forgetPasswordSlice"
import dashBoardReducer from "../redux/slice/dashBoardSlice"
import groupReducer from "../redux/slice/groupSlice"
import taskReducer from "../redux/slice/taskSlice"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        forgetPassword: forgetPasswordReducer,
        dashBoard: dashBoardReducer,
        group:groupReducer,
        task:taskReducer
    }
})