import {createSlice} from "@reduxjs/toolkit"
import { sendPassLinkEmail,changePasswordWithToken,verifyLink } from "../thunk/forgetPasswordThunk"

const initialState = {
    loading:false,
    tokenSent: true,
    token:null,
    loading:false,
}


const forgetPasswordSlice = createSlice({
    name:"forgetPassword",
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
            
            // Gửi email
            .addCase(sendPassLinkEmail.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.signUpSuccess = false;
            })
            .addCase(sendPassLinkEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.tokenSent = true;
                state.error = null;
            })
            .addCase(sendPassLinkEmail.rejected, (state, action) => {
                state.loading = false;
                state.tokenSent = false;
                state.error = action.payload || "Gửi token thất bại";
                state.signUpSuccess = false;
            })

            // VerifyLink
            .addCase(verifyLink.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.signUpSuccess = false;
            })
            .addCase(verifyLink.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(verifyLink.rejected, (state, action) => {
                state.loading = false;
                state.tokenSent = false;
                state.error = action.payload || "Gửi token thất bại";
                state.signUpSuccess = false;
            })

            


    }
})


export default forgetPasswordSlice.reducer;