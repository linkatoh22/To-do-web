import {Box,Grid,Typography,TextField,InputAdornment,Button, Link } from "@mui/material"
import LogInPic from "../../assets/pic/logInPic.jpg"
import styled from "styled-components";
import { Person, PersonOutline, AlternateEmail, Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { GoogleSVG } from "../../assets/svg/googleSvg";
import BadgeIcon from '@mui/icons-material/Badge';
import { useEffect, useState } from "react";
import MailLockIcon from '@mui/icons-material/MailLock';
import { useSelector,useDispatch } from "react-redux";
import {fetchVerifyOTP,fetchResendOTP} from "../../redux/thunk/authThunk";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { decryptTokenHex } from "../../utils/generateToken";

export function OtpVerifyForm() {
    const dispatch = useDispatch()
    const { loading,error,otpVerified,userId } = useSelector(s => s.auth)
    const { token } = useParams();
    const [isVerify,setIsVerify] = useState(true);
    const [decryptedUserId, setDecryptedUserId] = useState(null);
    const navigate= useNavigate();

    useEffect(() => {
    if (token) {
        const result = decryptTokenHex(token);  // ← Lưu kết quả
        if (result) {
            setDecryptedUserId(result);      // ← Lưu userId đã decrypt
            setIsVerify(true);
        } else {
            setIsVerify(false);
            setDecryptedUserId(null);
        }
    } else {
        setIsVerify(false);
    }
}, [token])



    const [formData, setFormData] = useState({
        otp: ""
      })
    
      const handleInputChange = (key,value) => {
        setFormData((prev) => ({
          ...prev,
          [key]:value
        }))
      }
    
      const handleSubmit = async (event) => {
            event.preventDefault()
          
            try{

                const response = await dispatch(fetchVerifyOTP({
                    otp: formData.otp,
                    userId: decryptedUserId  // ← Dùng userId đã decrypt
                }));


                if (response.payload.status === "Success") {
                    toast.success("Xác nhận OTP thành công. Tài khoản đã được kích hoạt vui lòng đăng nhập lại");
                    navigate("/dang-nhap");
                } else {
                    toast.error("Lỗi: " + response.error.message);
                }


            }
            catch(error){
                toast.error("Lỗi: " + response.error.message);
            }
        
      }
      const handleResend = async () => {
       
        const response = await dispatch(fetchResendOTP({
            userId: decryptedUserId 
        }));
        if (response.payload.status === "Success") {
            toast.success("Đã gửi lại OTP thành công. Vui lòng kiểm tra email của bạn");
        } else {
            toast.error("Lỗi: " + response.error.message);
        }
        
      }
    return (
        <Box sx={{
            width: { xs: "70%", sm: "70%", md: "60%",lg: "40%" },
            height: { xs: "65%", sm: "80%", md: "70%",lg: "50%" },
            backgroundColor: "white",
            borderRadius: "20px",
            
            display: "flex",
            flexDirection: "row",


            padding: { xs: 4, sm: 2, md: 3,lg: 4 },
            gap:{ xs: 3, sm: 4, md: 7,lg: 8 },
        }}>
            
            

            <Box sx={{
                display:"flex",
                flexDirection:"column",
                width:{ xs: "100%", sm: "100%", md: "100%",lg: "100%" },
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
                            md: "center", // desktop
                            lg: "center",   // large desktop
                          },
                        fontWeight: 700 
                    }
                    
                    }>{isVerify? "Xác nhận OTP": "Link đã hết hạn vui lòng thử lại sau"}</Typography>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column",  gap:{ xs: 1, sm: 1.5, md: 2,lg: 2.5 } }}>
                        
                        <TextField
                        disabled={!isVerify}
                        fullWidth
                        placeholder="Nhập OTP của bạn"
                        value={formData.otp}
                        onChange={(e)=>handleInputChange("otp",e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <MailLockIcon sx={{ color: "black" }} />
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
                        disabled={!isVerify || loading}
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
                                sm: "1rem",   // tablet
                                md: "1rem", // desktop
                                lg: "1.1rem",   // large desktop
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
                        Xác nhận
                    </Button>


                    

                        {isVerify && (
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
                            }}> 
                            
                            Không nhận được OTP? <Link onClick={()=>handleResend()}>Gửi lại OTP</Link> ngay</Typography>
                        )}
                    </Box>
                </form>


            </Box>
            
            
                
        </Box>
    )

}
