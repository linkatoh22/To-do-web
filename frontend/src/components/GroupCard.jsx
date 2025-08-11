import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Drawer,
  Grid,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import { EditGroupDialog } from "./GroupDialog/EditGroupDialog";
import { ViewDetailGroup } from "./GroupDialog/ViewDetailGroupDialog";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { fetchDeleteGroup } from "../redux/thunk/groupThunk";
import { useDispatch } from "react-redux";

export function GroupCard({groupData,refetch}){
    const [showMore, setShowMore] = useState(false);
    const content = groupData?.Description?? "Chưa cập nhập";

    const shortContent = content.slice(0, 120) + (content.length > 120 ? "..." : "");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [openViewDialog, setOpenViewDialog] = useState(false);
    
    const handleCloseViewDialog = () => {
        setOpenViewDialog(false);
    };

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (type) => {
        if (type === "edit") {
            setOpenEditDialog(true)
           
        }
        else if (type === "view") {
            setOpenViewDialog(true)
            
        }
        else if(type=== "viewAll"){
             navigate(`/group/task/${groupData?.id}`)
        }
        setAnchorEl(null);
    };

    // const handleNavViewAll = (groupId)=>{
    //     if(groupId)
    //         navigate(`/group/task/${groupId}`)
    // }
    const handleDeleteGroup = async(id)=>{
        const response = await dispatch(fetchDeleteGroup({groupId:id}))

        if (response?.payload?.status == "Success") {
            toast.success("Xóa nhóm công việc thành công.")
            refetch();
            

        } else {
            toast.error("Lỗi: " + response?.payload?.message);
        }

    }

    return(
        <>
        <Card sx={{ maxWidth: 400,  "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        },
        transition: "box-shadow 0.3s ease" }}>
            <CardMedia
                component="img"
                sx={{width:"100%", aspectRatio: "1 / 1", objectFit: "cover" }}
                image={groupData?.Pic??"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                
            />

            <CardContent>

                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

                    
                    <Typography variant="h9" sx={{fontWeight:600,width:"90%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {groupData?.Name??"Chưa cập nhập"}
                    </Typography>

                    <Box>
                    <IconButton>
                            <MoreHorizIcon sx={{color:"#F24E1E",fontSize:"1.7rem"}} onClick={handleClick}></MoreHorizIcon>
                            
                    </IconButton>

                    <Menu
                        id="demo-customized-menu"
                        slotProps={{
                        list: {
                            'aria-labelledby': 'demo-customized-button',
                        },
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={()=>handleClose("none")}
                    >
                        <MenuItem onClick={()=>handleClose("view")} disableRipple>
                        {/* <EditIcon /> */}
                        Xem chi tiết
                        </MenuItem>
                        <MenuItem onClick={()=>{
                            handleClose("viewAll")
                            
                            }} disableRipple>
                        {/* <FileCopyIcon /> */}
                        Xem danh sách
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={()=>handleClose("edit")} disableRipple>
                        {/* <ArchiveIcon /> */}
                        Sửa
                        </MenuItem>
                        <MenuItem 
                        onClick={()=>{
                            handleClose("delete")
                            handleDeleteGroup(groupData.id)
                        }} disableRipple>
                        {/* <MoreHorizIcon /> */}
                        Xóa
                        </MenuItem>
                    </Menu>
                    </Box>

                    
                </Box>

                <Typography sx={{mt:1}}>
                    {showMore ? content : shortContent}
                </Typography>
                {content.length > 120 && (
                    <Box sx={{mt:1}}>
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ cursor: "pointer", fontWeight: 500 }}
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "Thu gọn" : "Xem thêm"}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>

        <EditGroupDialog
            groupData={groupData}
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            onSuccess={refetch}
        ></EditGroupDialog>

        <ViewDetailGroup
            groupDataDetail={groupData}
            open={openViewDialog}
            onClose={handleCloseViewDialog}>
            
        </ViewDetailGroup>
        </>

    )
}