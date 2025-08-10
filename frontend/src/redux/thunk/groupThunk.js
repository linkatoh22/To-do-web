import { createAsyncThunk } from "@reduxjs/toolkit";
import { GroupApi } from "../api/GroupAPI";

export const fetchAllGroup = createAsyncThunk(
    "group/fetchAllGroup",
    async(_,{rejectWithValue })=>{
        try{
            const response = await GroupApi.fetchAllGroup();
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)


export const fetchDetailGroup = createAsyncThunk(
    "group/fetchDetailGroup",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await GroupApi.fetchDetailGroup(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)

export const fetchCreateGroup = createAsyncThunk(
    "group/fetchCreateGroup",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await GroupApi.fetchCreateGroup(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)


export const fetchUpdateGroup = createAsyncThunk(
    "group/fetchUpdateGroup",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await GroupApi.fetchUpdateGroup(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)

export const fetchDeleteGroup = createAsyncThunk(
    "group/fetchDeleteGroup",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await GroupApi.fetchDeleteGroup(payload);
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)
