import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'   
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import theme from "./theme"; 


function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>  
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/dang-ky" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
