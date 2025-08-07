import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { BrowserRouter, Routes, Route } from 'react-router-dom'   
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { OtpVerify } from './pages//OtpVerify'
import GoogleSuccessPage from './pages/GoogleSuccessPage'
import { ForgetPasswordPage } from './pages/ForgetPasswordPage'
import { ChangePasswordPage } from './pages/ChangePasswordPage'
import { GroupPage } from './pages/GroupPage'
import { HomePage } from './pages/Homepage'
import { AllTaskPage } from './pages/AllTaskPage'
import { DetailTaskPage } from './pages/DetailTaskPage'
import { UserDetailContainer } from './components/UserDetailPage/UserDetailContainer'

import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import theme from "./theme"; 

import { store } from './redux/store'
import { Provider } from 'react-redux';
import PrivateRoute from "./PrivateRoute"
import {AuthProvider} from  "./context/authContext"
import RootLayout from './Layout'
function App() {
  

  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <BrowserRouter>
                      <Routes>  

                        <Route path="/" element={<RootLayout />}>
                          <Route element={<PrivateRoute/>}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/group" element={<GroupPage />} />
                            <Route path="/all-task" element={<AllTaskPage />} />
                            <Route path="/detail-task" element={<DetailTaskPage />} />
                            <Route path="/user" element={<UserDetailContainer />} />
                          </Route>
                        </Route>
                        
                        
                          <Route path="/dang-nhap" element={<LoginPage />} />
                          <Route path="/dang-ky" element={<SignUpPage />} />
                          <Route path="/xac-thuc-otp/:token" element={<OtpVerify />} />
                          
                          <Route path="/google-success" element={<GoogleSuccessPage />} />
                          <Route path="/quen-mat-khau" element={<ForgetPasswordPage />} />
                          
                          <Route path="/doi-mat-khau/:token" element={<ChangePasswordPage />} />
                      </Routes>
                </BrowserRouter>
            </AuthProvider>
            <ToastContainer />
        </ThemeProvider>
    </Provider>
  )
}

export default App
