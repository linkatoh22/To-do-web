import {createSlice} from "@reduxjs/toolkit"
import { fetchAllGroup,fetchDetailGroup,fetchCreateGroup,fetchUpdateGroup,fetchDeleteGroup } from "../thunk/groupThunk"

const initialState = {
    loading:false,
    AllGroup:[],
    GroupDetail:null
}


const groupSlice = createSlice({
    name:"group",
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAllGroup.pending,(state)=>{
                state.loading = true;
                state.error = null;
               
            })
            .addCase(fetchAllGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.AllGroup = action.payload.data;
                state.error = null;
            })
            .addCase(fetchAllGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Gửi token thất bại";
            })



            .addCase(fetchDetailGroup.pending,(state)=>{
                state.loading = true;
                state.error = null;
                
            })
            .addCase(fetchDetailGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.GroupDetail = action.payload.data;
                state.error = null;
            })
            .addCase(fetchDetailGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lấy Task gần deadline thất bại";
            })
            
            //CREATE
            .addCase(fetchCreateGroup.pending,(state)=>{
                state.loading = true;
                state.error = null;
                
            })
            .addCase(fetchCreateGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCreateGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Tạo nhóm thất bại";
            })



            //UPDATE
            .addCase(fetchUpdateGroup.pending,(state)=>{
                state.loading = true;
                state.error = null;
                
            })
            .addCase(fetchUpdateGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchUpdateGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Tạo nhóm thất bại";
            })

            //DELETE
            .addCase(fetchDeleteGroup.pending,(state)=>{
                state.loading = true;
                state.error = null;
                
            })
            .addCase(fetchDeleteGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchDeleteGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Tạo nhóm thất bại";
            })



            

            

            

    }
})


export default groupSlice.reducer;