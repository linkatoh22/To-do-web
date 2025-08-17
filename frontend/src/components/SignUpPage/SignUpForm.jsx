import {Box,Grid,Typography,TextField,InputAdornment,Button, Link } from "@mui/material"
import SignUpPic from "../../assets/pic/signUpPic.jpg"
import styled from "styled-components";
import { Person, PersonOutline, AlternateEmail, Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { toast } from "react-toastify";
import BadgeIcon from '@mui/icons-material/Badge';
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchSignUp } from "../../redux/thunk/authThunk";
import { useNavigate } from "react-router-dom";
import { generateOtpLink } from "../../utils/generateToken";
const SignUpPicImg = styled.img`
    width:80%;
`
export function SignUpForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading,error,otpSent,userId } = useSelector(s => s.auth)
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    
    

    const handleInputChange = (key,value) => {
    setFormData((prev) => ({
        ...prev,
        [key]:value
    }))
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        
        if(formData.password.trim() != formData.confirmPassword.trim()){
            
            toast.error("Lỗi: Mật khẩu xác nhận không khớp.")
            return;
        }

      
        const response = await dispatch(fetchSignUp(formData));
        if (response.payload.status === "Success") {

            
             const newUserId = response.payload.data.userId;
           
            toast.success("Đăng ký thành công!");
            const tokenOtp = generateOtpLink(newUserId);
            navigate(`/xac-thuc-otp/${tokenOtp}`);

        } else {
            console.error("Lỗi đăng ký:", response?.payload?.message);
        }
        

        
      }
    
    useEffect(() => {
        document.body.style.cursor = loading ? "wait" : "default";
        return () => {
            document.body.style.cursor = "default";
        };
    }, [loading]);

    return (
        <Box sx={{
            width: { xs: "70%", sm: "70%", md: "60%",lg: "60%" },
            height: { xs: "65%", sm: "80%", md: "70%",lg: "70%" },
            backgroundColor: "white",
            borderRadius: "20px",
            
            display: "flex",
            flexDirection: "row",


            padding: { xs: 4, sm: 2, md: 3,lg: 4 },
            gap:{ xs: 3, sm: 4, md: 7,lg: 8 },
        }}>
            <Box sx={{
                display: { xs: "none", sm: "none", md: "flex",lg: "flex" },
                flexDirection: "column",
                justifyContent:"flex-end",
                

                width:"40%"
            }}>
                <SignUpPicImg src={SignUpPic}></SignUpPicImg>

            </Box>
            

            <Box sx={{
                display:"flex",
                flexDirection:"column",
                width:{ xs: "100%", sm: "100%", md: "50%",lg: "50%" },
                justifyContent:"center",
                gap:{ xs: 1, sm: 1.5, md: 2,lg: 2.5 },
                
            }}>
                <Typography sx={
                    { 
                        mt: 2,
                        fontSize: {
                          xs: "2rem", // mobile
                          sm: "2rem",   // tablet
                          md: "2.5rem", // desktop
                          lg: "3rem",   // large desktop
                        },
                        textAlign:{
                            xs: "center", // mobile
                            sm: "center",   // tablet
                            md: "left", // desktop
                            lg: "left",   // large desktop
                          },
                        fontWeight: 700 
                    }
                    
                    }>Đăng Ký</Typography>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column",  gap:{ xs: 1, sm: 1.5, md: 2,lg: 2.5 } }}>
                        
                        <TextField
                        required
                        fullWidth
                        placeholder="Nhập tên của bạn"
                          value={formData.firstName}
                          onChange={(e)=>handleInputChange("firstName",e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <BadgeIcon sx={{ color: "black" }} />
                            </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        sx={{
                        
                            input: {
                                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                                padding: { xs: "10px 12px", sm: "14px 16px" },
                            },
                        }}
                        />


                        <TextField
                        required
                        fullWidth
                        placeholder="Nhập họ của bạn"
                          value={formData.lastName}
                          onChange={(e)=>handleInputChange("lastName",e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <BadgeIcon sx={{ color: "black" }} />
                            </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        sx={{
                        
                            input: {
                                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                                padding: { xs: "10px 12px", sm: "14px 16px" },
                            },
                        }}
                        />

                        <TextField
                        required
                        fullWidth
                        placeholder="Nhập tên hiển thị của bạn"
                        
                        value={formData.username}
                        onChange={(e)=>handleInputChange("username",e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <Person sx={{ color: "black" }} />
                            </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        sx={{
                        
                            input: {
                                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                                padding: { xs: "10px 12px", sm: "14px 16px" },
                            },
                        }}
                        />

                        <TextField
                        required
                        fullWidth
                        placeholder="Nhập email của bạn"
                        value={formData.email}
                        onChange={(e)=>handleInputChange("email",e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <AlternateEmail sx={{ color: "black" }} />
                            </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        sx={{
                        
                            input: {
                                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                                padding: { xs: "10px 12px", sm: "14px 16px" },
                            },
                        }}
                        />

                        <TextField
                        required
                        type="password"
                        fullWidth
                        placeholder="Nhập mật khẩu"
                        value={formData.password}
                        onChange={(e)=>handleInputChange("password",e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <Lock sx={{ color: "black" }} />
                            </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        sx={{
                        
                            input: {
                                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                                padding: { xs: "10px 12px", sm: "14px 16px" },
                            },
                        }}
                        />


                        <TextField
                        required
                        fullWidth
                        type="password"
                        placeholder="Nhập mật khẩu xác nhận"
                        value={formData.confirmPassword}
                        onChange={(e)=>handleInputChange("confirmPassword",e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlineIcon sx={{ color: "black" }} />
                            </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        sx={{
                        
                            input: {
                                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                                padding: { xs: "10px 12px", sm: "14px 16px" },
                            },
                        }}
                        />


                        


                    </Box>


                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap:2.5
                    }}>

                    <Button
                        disabled={loading}
                        type="submit"
                        sx={{
                            
                            px: {
                                xs: 3, // mobile
                                sm: 3.5,   // tablet
                                md: 4, // desktop
                                lg: 4.5,   // large desktop
                            },
                            py: {
                                xs: 1, // mobile
                                sm: 1,   // tablet
                                md: 1.5, // desktop
                                lg: 1.5,   // large desktop
                            },
                            fontSize:{
                                xs: "0.95rem", // mobile
                                sm: "1.1rem",   // tablet
                                md: "1.1rem", // desktop
                                lg: "1.5rem",   // large desktop
                            },
                            background: "linear-gradient(45deg, #FF6B6B 30%, #FF8A80 90%)",
                            color: "white",
                            boxShadow: "none",
                            "&:hover": {
                            background: "linear-gradient(45deg, #FF8A80 30%, #FF6B6B 90%)",
                            boxShadow: "none",
                            },
                        }}
                        variant="contained"
                        >
                            {loading? "Đang xử lý..." : "Đăng ký"}
                        
                    </Button>

                    <Typography sx={
                        { 
                            mt: 2,
                            fontSize: {
                            xs: "0.95rem", // mobile
                            sm: "1.1  rem",   // tablet
                            md: "1.15rem", // desktop
                            lg: "1.15rem",   // large desktop
                            },
                            textAlign:{
                                xs: "center", // mobile
                                sm: "center",   // tablet
                                md: "left", // desktop
                                lg: "left",   // large desktop
                            },
                            }}> Đã có tài khoản? <Link href="/dang-nhap">Đăng nhập</Link> ngay</Typography>

                    </Box>
                </form>


            </Box>

                
        </Box>
    )
}