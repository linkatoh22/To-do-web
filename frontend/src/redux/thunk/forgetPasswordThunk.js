import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgetPasswordApi } from "../api/forgetPasswordAPI";

export const sendPassLinkEmail = createAsyncThunk(
    "auth/sendPassLinkEmail",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await forgetPasswordApi.sendPassLinkEmail(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)


export const changePasswordWithToken = createAsyncThunk(
    "auth/changePasswordWithToken",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await forgetPasswordApi.changePasswordWithToken(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)

export const verifyLink = createAsyncThunk(
    "auth/verifyLink",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await forgetPasswordApi.verifyLink(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)