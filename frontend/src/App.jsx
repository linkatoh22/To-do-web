import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'   
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { OtpVerify } from './pages//OtpVerify'
import GoogleSuccessPage from './pages/GoogleSuccessPage'


import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import theme from "./theme"; 

import { store } from './redux/store'
import { Provider } from 'react-redux';



function App() {
  

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>

        <BrowserRouter>
            <Routes>  
              <Route path="/dang-nhap" element={<LoginPage />} />
              <Route path="/dang-ky" element={<SignUpPage />} />
              <Route path="/xac-thuc-otp/:token" element={<OtpVerify />} />
              
              <Route path="/google-success" element={<GoogleSuccessPage />} />
            </Routes>
        </BrowserRouter>

        <ToastContainer />
      </ThemeProvider>
    </Provider>
  )
}

export default App
