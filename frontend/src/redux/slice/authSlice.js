import {createSlice} from "@reduxjs/toolkit"
import { fetchLogin,fetchSignUp,fetchResendOTP,fetchVerifyOTP,fetchLogOut } from "../thunk/authThunk";

const initialState = {
    
    userId:null,
    emailSignUp:null,

    accessToken:null,
    loading:false,
    otpSent: false,
    otpVerified: false,
    signUpSuccess: false,

    userInfo:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout(state){
            state.user  = null;
            state.error = null;
            state.otpSent = false;
            state.otpVerified = false;
            state.signUpSucess = false;
        }
    },
    extraReducers:(builder)=>{
        builder
            
            // Đăng ký
            .addCase(fetchSignUp.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.signUpSuccess = false;
            })
            .addCase(fetchSignUp.fulfilled, (state, action) => {
                state.loading = false;
                state.signUpSuccess = true;
                state.userId = action.payload.data.userId;
                state.otpSent = true;
                state.error = null;
            })
            .addCase(fetchSignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Đăng ký thất bại";
                state.signUpSuccess = false;
            })


            // Đăng nhập
            .addCase(fetchLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.token.accessToken;
                state.userInfo = action.payload.token.user;
                state.error = null;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Đăng nhập thất bại";
            })


            // Verify OTP
            .addCase(fetchVerifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVerifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.otpVerified = true;
                state.error = null;
            })
            .addCase(fetchVerifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Xác thực OTP thất bại";
                state.otpVerified = false;
            })



            // Resend OTP
            .addCase(fetchResendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchResendOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.otpSent = true;
                state.error = null;
            })
            .addCase(fetchResendOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Gửi lại OTP thất bại";
            })

            

            .addCase(fetchLogOut.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLogOut.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchLogOut.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Đăng xuất thật bại";
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;