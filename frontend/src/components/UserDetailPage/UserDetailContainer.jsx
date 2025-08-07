import {TaskCard} from "../TaskCard";
import { Button, Grid, MenuItem,Box,Typography,IconButton,TextField } from "@mui/material";
import styled from "styled-components";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon
} from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { use, useState } from "react";

const ImageGroup = styled.img`
        width:8%;
        aspect-ratio: 1 / 1;
     object-fit: cover;
     border-radius: 100%;
`



export function UserDetailContainer(){
    const [isEdit,setIsEdit]= useState(false);

    const handleEditClick = () => {
        
        setIsEdit(!isEdit);
    }

    const [formData,setFormData] = useState({
        first_name:"",
        last_name:"",
        username:"",
        image:""
    })

    const handleInputChange = (field, value) => {
         event.preventDefault()
        setFormData({
            ...formData,
            [field]: value
        });
    }

    const handleSubmit = async (event)=>{
            event.preventDefault()
         console.log(formData)
    }
    return(
        <Box sx={{p:5}}>
                    <Box sx={{p:5, mt:2, borderRadius:3,border: "1px solid #A1A3ABA1",height:"73vh"}}>
                        
                        <Typography variant="h6" sx={{fontWeight:600,mb:2,borderBottom:"3px solid #F24E1E"}}>Nhóm của bạn</Typography>

                        <Box sx={{display:"flex",gap:2,alignItems:"center",mb:2}}>
                                <ImageGroup src="https://mui.com/static/images/cards/live-from-space.jpg" />

                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 600 }}>Sundar Gurung</Typography>
                                    <Typography variant="h7">SundarGurung@gmail</Typography>
                                </Box>
                        </Box>

                        <Box sx={{p:5, mt:2, borderRadius:3,border: "1px solid #A1A3ABA1",display:"flex",flexDirection:"column",gap:2}}>

                            <form onSubmit={handleSubmit}>
                            <Box sx={{width:"65%"}}>
                                <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Họ Tên:</Typography>
                                <TextField fullWidth  id="fullWidth" required 
                                    disabled={!isEdit}

                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 3      
                                        },
                                        "& .MuiInputBase-input": {
                                            py: 1.2, 
                                        }
                                    }}
                                    onChange={(e)=>handleInputChange("username",e.target.value)} 
                                    value={formData.username}
                                />
                            </Box>

                            <Box sx={{width:"65%"}}>
                                <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Tên:</Typography>
                                <TextField fullWidth  id="fullWidth" required  disabled={!isEdit} 
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 3      
                                        },
                                        "& .MuiInputBase-input": {
                                            py: 1.2, 
                                        }
                                    }}
                                    onChange={(e)=>handleInputChange("first_name",e.target.value)} 
                                    value={formData.first_name}
                                />
                            </Box>


                            <Box sx={{width:"65%"}}>
                                <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Họ:</Typography>
                                <TextField fullWidth  id="fullWidth" required  disabled={!isEdit}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 3      
                                        },
                                        "& .MuiInputBase-input": {
                                            py: 1.2, 
                                        }
                                    }}
                                    onChange={(e)=>handleInputChange("last_name",e.target.value)} 
                                    value={formData.last_name}
                                />
                            </Box>
                            </form>


                            <Box sx={{width:"70%", display:"flex", gap:2, alignItems:"center"}}>
                                <Button 
                                
                                variant= {isEdit?"contained":"outlined" }
                                onClick={(e)=>{
                                    handleEditClick()
                                    isEdit? handleSubmit(e):null
                                }}
                                sx={{
                                    backgroundColor: isEdit ? "#F24E1E" : "transparent",
                                    color: isEdit ? "white" : "#F24E1E",
                                    borderColor: "#F24E1E",
                                    "&:hover": {
                                    backgroundColor: isEdit ? "#d63a0e" : "rgba(242,78,30,0.08)"
                                    }
                                }}
                                
                                
                                >
                                     {isEdit? "Xong":"Chỉnh sửa thông tin"}
                                </Button>

                                <Button variant="contained" sx={{backgroundColor:"#F24E1E",color:"white"}}>
                                   Đổi mật khẩu
                                </Button>
                            </Box>

                        </Box>
                        

                    </Box>
        </Box>
    )
}