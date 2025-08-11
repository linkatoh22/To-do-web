import {createSlice} from "@reduxjs/toolkit"
import { fetchEditProfile,fetchChangePassword,fetchViewProfile } from "../thunk/userThunk"

const initialState = {
    loading:false,
    Profile:null,
    error:null
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
           
            .addCase(fetchEditProfile.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.signUpSuccess = false;
            })
            .addCase(fetchEditProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchEditProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Chỉnh sửa thông tin cá nhân thất bại";
            })


            .addCase(fetchChangePassword.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.signUpSuccess = false;
            })
            .addCase(fetchChangePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchChangePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Chỉnh sửa thông tin cá nhân thất bại";
            })


            .addCase(fetchViewProfile.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.signUpSuccess = false;
            })
            .addCase(fetchViewProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.Profile = action.payload.user;
                state.error = null;
            })
            .addCase(fetchViewProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Chỉnh sửa thông tin cá nhân thất bại";
            })

    }
})


export default userSlice.reducer;