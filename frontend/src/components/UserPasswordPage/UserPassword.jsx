import {TaskCard} from "../TaskCard";
import { Button, Grid, MenuItem,Box,Typography,IconButton,TextField, Avatar } from "@mui/material";
import styled from "styled-components";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon
} from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { fetchViewProfile,fetchEditProfile } from "../../redux/thunk/userThunk";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { use, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { fetchChangePassword } from "../../redux/thunk/userThunk";



export function UserPassword(){
    const dispatch = useDispatch()
    const {loading} = useSelector(s=>s.user)
    const [isEdit,setIsEdit]= useState(false);

    const [formData,setFormData] = useState({
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
    })

    const handleInputChange = (field, value) => {
        
        setFormData({
            ...formData,
            [field]: value
        });
    }

    const handleSubmit = async (event)=>{
            event.preventDefault()
            console.log("formData: ",formData)
            if(formData.newPassword !=formData.confirmPassword){
                toast.error("Lỗi: Mật khẩu mới và mật khẩu xác nhận không giống nhau.")
                return
            }
            if(formData.newPassword <8){
                toast.error("Lỗi: Mật khẩu phải có chiều dài lớn hơn 0.")
                return
            }

            const response = await dispatch(fetchChangePassword(formData))

             if (response?.payload?.status == "Success") {
                toast.success("Đổi mật khẩu thành công.")
                        
            } else {
                toast.error("Lỗi: " + response?.payload?.message);
            }
    }


   


    
    return(
        <Box sx={{p:5}}>
                    <Box sx={{p:5, mt:2, borderRadius:3,border: "1px solid #A1A3ABA1",height:"73vh"}}>
                        
                        <Typography variant="h6" sx={{fontWeight:600,mb:2,borderBottom:"3px solid #F24E1E"}}>Nhóm của bạn</Typography>

                        <Box sx={{display:"flex",gap:2,alignItems:"center",mb:2}}>
                                <Avatar
                                    src="/placeholder.svg?height=80&width=80"
                                    sx={{
                                        width: { xs: 60, sm: 80 },
                                        height: { xs: 60, sm: 80 },
                                        // mx: "auto",
                                        // mb: 2,
                                        border: "3px solid rgba(255, 255, 255, 0.3)",
                                    }}
                                    />

                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 600 }}>Sundar Gurung</Typography>
                                    <Typography variant="h7">SundarGurung@gmail</Typography>
                                </Box>
                        </Box>

                        <Box sx={{p:5, mt:2, borderRadius:3,border: "1px solid #A1A3ABA1",display:"flex",flexDirection:"column",gap:2}}>

                            <form onSubmit={handleSubmit}>
                            <Box sx={{width:"45%"}}>
                                <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Mật khẩu cũ:</Typography>
                                <TextField 
                                    type="password"
                                    fullWidth  id="fullWidth" 
                                    required 
                                    
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 3      
                                        },
                                        "& .MuiInputBase-input": {
                                            py: 1.2, 
                                        }
                                    }}
                                    onChange={(e)=>handleInputChange("oldPassword",e.target.value)} 
                                    value={formData.oldPassword}
                                />
                            </Box>

                            <Box sx={{width:"45%",mt:1}}>
                                <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Mật khẩu mới:</Typography>
                                <TextField 
                                    type="password"
                                    fullWidth  id="fullWidth" 
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 3      
                                        },
                                        "& .MuiInputBase-input": {
                                            py: 1.2, 
                                        }
                                    }}
                                    onChange={(e)=>handleInputChange("newPassword",e.target.value)} 
                                    value={formData.newPassword}
                                />
                            </Box>


                            <Box sx={{width:"45%",mt:1}}>
                                <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Xác nhận:</Typography>
                                <TextField 
                                    type="password"
                                    fullWidth  id="fullWidth" required  
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 3      
                                        },
                                        "& .MuiInputBase-input": {
                                            py: 1.2, 
                                        }
                                    }}
                                    onChange={(e)=>handleInputChange("confirmPassword",e.target.value)} 
                                    value={formData.confirmPassword}
                                />
                            </Box>
                            </form>


                            <Box sx={{width:"70%", display:"flex", gap:2, alignItems:"center"}}>
                                <Button 
                                disable={loading}
                                onClick={(e)=>handleSubmit(e)}
                                variant="contained" sx={{backgroundColor:"#F24E1E",color:"white"}}>
                                   Đổi mật khẩu
                                </Button>
                            </Box>

                        </Box>
                        

                    </Box>
        </Box>
    )
}