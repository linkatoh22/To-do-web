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
import { fetchUpdateGroup } from "../../redux/thunk/groupThunk";
import { toast } from "react-toastify";
import { LoadingContainer } from "../loadingContainer";

const ImageGroup = styled.img`
        width:8%;
        aspect-ratio: 1 / 1;
     object-fit: cover;
     border-radius: 100%;
`



export function UserDetailContainer(){
    const dispatch = useDispatch()
    
    const [isEdit,setIsEdit]= useState(false);
    
    const {Profile,loading} = useSelector(s=>s.user)
    useEffect(()=>{
        const fetchProfileRender = async() =>{
            await dispatch(fetchViewProfile());
        }
        fetchProfileRender();
    },[])

    
    const handleEditClick = () => {
        
        setIsEdit(!isEdit);
    }

    const [formData,setFormData] = useState({
        first_name:"",
        last_name:"",
        username:"",
        image:null
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
             editProfile();
    }


    useEffect(()=>{
        setFormData({
            first_name: Profile?.first_name??"",
            last_name:  Profile?.last_name??"",
            username:   Profile?.username??"",
            image:  Profile?.avatar??null,
        })
    },[Profile])


    const editProfile = async()=>{
         const payload = {
            first_name:formData.first_name,
            last_name:formData.last_name,
            username:formData.username,
           
        };
        const response = await dispatch(fetchEditProfile({payload}))

        if (response?.payload?.status == "Success") {
            toast.success("Chỉnh sửa người dùng thành công.")
            await dispatch(fetchEditProfile({payload:payload}));

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
                                    <Typography variant="h5" sx={{ fontWeight: 600 }}>{Profile?.username??"Chưa cập nhập"}</Typography>
                                    <Typography variant="h7">{Profile?.email??"Chưa cập nhập"}</Typography>
                                </Box>
                        </Box>

                        <Box sx={{p:5, mt:2, borderRadius:3,border: "1px solid #A1A3ABA1",display:"flex",flexDirection:"column",gap:2}}>
                            
                            {loading?
                            
                                <LoadingContainer/>

                                    :
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
                                    
                            }

                            


                            <Box sx={{width:"70%", display:"flex", gap:2, alignItems:"center"}}>
                                <Button 
                                disabled={loading}
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