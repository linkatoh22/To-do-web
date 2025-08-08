import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import {
  Box,
  DialogTitle,
  Dialog,
  IconButton,
  Grid,
  Typography,
  TextField,
  DialogContent,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import Textarea from '@mui/joy/Textarea';
import styled from "styled-components"

const ImageGroup = styled.img`
    width:100%; 
    aspect-ratio: 1 / 1;
     object-fit: cover;
`



export function ViewDetailGroup({open,onClose,groupDataDetail}){
    

    const [showMore, setShowMore] = useState(false);
    const content = groupDataDetail?.Description?? "Chưa cập nhập";

    const shortContent = content.slice(0, 120) + (content.length > 120 ? "..." : "");


    return(
        <Dialog 
            open={open}
            onClose={onClose}
            fullWidth maxWidth="lg"
            >
            
            <DialogTitle variant="h5" sx={{ m: 0, p: 2,fontWeight:"bold" }} id="customized-dialog-title">
                Xem thông tin group
            </DialogTitle>

            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
            >
            <CloseIcon />
            </IconButton>

            <DialogContent>
                
                   
                <Box sx={{p:4, borderRadius:1,border: "1px solid #A1A3ABA1"}}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6} sx={{maxWidth: 400}}>
                            <ImageGroup src={groupDataDetail?.Pic??"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{maxWidth:500}}>
                            <Box >
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    {groupDataDetail?.Name??"Chưa cập nhập"}
                                </Typography>

                                <Typography sx={{ mt: 1, whiteSpace: 'pre-line',fontSize: '1.2rem', color: '#555' }}>
                                {showMore ? content : shortContent}
                                </Typography>
                                
                                {content.length > 120 && (
                                <Box sx={{ mt: 1 }}>
                                    <Typography
                                    variant="body"
                                    color="primary"
                                    sx={{ cursor: "pointer", fontWeight: 500 }}
                                    onClick={() => setShowMore(!showMore)}
                                    >
                                    {showMore ? "Thu gọn" : "Xem thêm"}
                                    </Typography>
                                </Box>
                                )}
                            </Box>
                        </Grid>
                    </Grid>


                    
                    <Grid container spacing={2} sx={{mt:2}}>
                        <Grid item sx={{ xs: 12, md: 6 }}>
                            <Button
                                onClick={onClose}
                                fullWidth
                                                
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
                                                    }
                                                    , borderColor: '#FF6B6B',
                                                    color:"#FF6B6B", // Màu viền (outline)
                                                        '&:hover': {
                                                        borderColor: '#FF6B6B', // Màu viền khi hover
                                                        backgroundColor: 'rgba(255, 0, 0, 0.04)', // hiệu ứng nhẹ khi hover
                                                        }
                                                    
                                                }}
                                                variant="outlined"
                                                >
                                                ĐÓNG
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            
                
            </DialogContent>

        </Dialog>
    )
}