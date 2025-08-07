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
export function GroupCard(){
    const [showMore, setShowMore] = useState(false);
    const content = `Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
    large plate and set aside, leaving chicken and chorizo in the pan. Add
    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
    stirring often until thickened and fragrant, about 10 minutes. Add
    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.`;

    const shortContent = content.slice(0, 120) + (content.length > 120 ? "..." : "");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    


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
        setAnchorEl(null);
    };
    return(
        <>
        <Card sx={{ maxWidth: 440,  "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        },
        transition: "box-shadow 0.3s ease" }}>
            <CardMedia
                component="img"
                sx={{width:"100%", aspectRatio: "1 / 1", objectFit: "cover" }}
                image="https://mui.com/static/images/cards/live-from-space.jpg"
                alt="Live from space album cover"
            />

            <CardContent>

                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

                    
                    <Typography variant="h9" sx={{fontWeight:600,width:"90%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        Heat 1/2 cup of the broth in a pot until simmering.
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
                        <MenuItem onClick={()=>handleClose("viewAll")} disableRipple>
                        {/* <FileCopyIcon /> */}
                        Xem danh sách
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={()=>handleClose("edit")} disableRipple>
                        {/* <ArchiveIcon /> */}
                        Sửa
                        </MenuItem>
                        <MenuItem onClick={()=>handleClose("delete")} disableRipple>
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
            open={openEditDialog}
            onClose={handleCloseEditDialog}
        ></EditGroupDialog>

        <ViewDetailGroup
            open={openViewDialog}
            onClose={handleCloseViewDialog}>
        </ViewDetailGroup>
        </>

    )
}