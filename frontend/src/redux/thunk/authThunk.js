import { createAsyncThunk } from "@reduxjs/toolkit";
import {AuthApi} from "../api/authAPI"

export const fetchSignUp = createAsyncThunk(
    "auth/fetchSignUp",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await AuthApi.fetchSignUp(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)

export const fetchLogin = createAsyncThunk(
    "auth/fetchLogin",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await AuthApi.fetchLogIn(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }
)

export const fetchVerifyOTP = createAsyncThunk(
    "auth/fetchVerifyOTP",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await AuthApi.fetchVerifyOTP(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }
)


export const fetchResendOTP = createAsyncThunk(
    "auth/fetchResendOTP",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await AuthApi.fetchResendOTP(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }
)