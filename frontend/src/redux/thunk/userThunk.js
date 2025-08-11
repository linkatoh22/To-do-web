import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../api/UserAPI";

export const fetchEditProfile = createAsyncThunk(
    "dashBoard/fetchEditProfile",
    async(payload,{rejectWithValue })=>{
        try{

            const response = await UserApi.fetchEditProfile(payload);
            
            return response.data;

        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchViewProfile = createAsyncThunk(
    "dashBoard/fetchViewProfile",
    async(_,{rejectWithValue })=>{
        try{

            const response = await UserApi.fetchViewProfile();
            
            return response.data;

        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchChangePassword = createAsyncThunk(
    "dashBoard/fetchChangePassword",
    async(payload,{rejectWithValue })=>{
        try{

            const response = await UserApi.fetchChangePassword(payload);
            
            return response.data;

        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
