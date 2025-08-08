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


const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export function AddDialog({open,onClose,onCreate}){
    const [formData, setFormData] = useState({
            name: "",
            groupId: "",
            status:"",
            priority: "",
            startDate:dayjs(),
            endDate:dayjs(),
            description: "",
            additionNotes:""
          })

     const handleInputChange = (key,value) => {
        setFormData((prev) => ({
          ...prev,
          [key]:value
        }))
      }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(formData)
        if (formData.endDate.isSame(formData.startDate) || formData.endDate.isBefore(formData.startDate)) {
            toast.error("Ngày kết thúc phải sau ngày bắt đầu");
            return;
        }

        onCreate({
            Name:formData.name,
            Description:formData.description??null,
            Priority:formData.priority??null,
            Status:formData.status??null,
            StartDate:formData.startDate,
            EndDate:formData.endDate,
            GroupId:formData.groupId??null,
            AdditionalNotes:formData.additionNotes??null
        })
    }
    return(
        <Dialog 
            open={open}
            onClose={onClose}
            fullWidth maxWidth="lg"
            >
            
            <DialogTitle variant="h5" sx={{ m: 0, p: 2,fontWeight:"bold" }} id="customized-dialog-title">
                Thêm task mới
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
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{p:4, mt:2, borderRadius:1,border: "1px solid #A1A3ABA1"}}>
                            <Grid container spacing={3}>

                                <Grid size={{ xs: 6, md: 6 }} >
                                    {/* TÊN TASK */}
                                    <Box >
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Tên task:</Typography>
                                        <TextField fullWidth  id="fullWidth" required onChange={(e)=>handleInputChange("name",e.target.value)} value={formData.name}/>
                                    </Box>

                                    <Box sx={{mt:2}}>
                                    {/* STATUS */}
                                    
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Tình trạng:</Typography>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            required onChange={(e)=>handleInputChange("status",e.target.value)} 
                                            value={formData.status}
                                        >
                                            <FormControlLabel value="Chưa bắt đầu" control={<Radio />} label="Chưa bắt đầu" />
                                            <FormControlLabel value="Đang làm" control={<Radio />} label="Đang làm" />
                                            <FormControlLabel value="Hoàn thành" control={<Radio />} label="Hoàn thành" />
                                            
                                        </RadioGroup>
                                    
                                    </Box>


                                    {/* START DATE */}
                                    <Box sx={{mt:2}}>
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Ngày bắt đầu:</Typography>
                                        <DatePicker
                                           value={formData.startDate}
                                            onChange={(newValue) => handleInputChange("startDate", newValue)}
                                            slots={{ textField: TextField }}
                                            slotProps={{ textField: { required: true } }}
                                            enableAccessibleFieldDOMStructure={false}
                                        />
                                    </Box>



                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }} >
                                    {/* CHỌN NHÓM */}
                                    <Box >
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Chọn nhóm:</Typography>
                                        <FormControl fullWidth>
                                            
                                            
                                            <Select
                                                required onChange={(e)=>handleInputChange("groupId",e.target.value)} value={formData.groupId}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={age}
                                                
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                // onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    {/* CHỌN PRIORITY */}
                                    <Box sx={{mt:2}}>
                                        
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Độ ưu tiên:</Typography>
                                        <RadioGroup
                                            required onChange={(e)=>handleInputChange("priority",e.target.value)} value={formData.priority}
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="Thấp" control={<Radio />} label="Thấp" />
                                            <FormControlLabel value="Trung bình" control={<Radio />} label="Trung bình" />
                                            <FormControlLabel value="Cao" control={<Radio />} label="Cao" />
                                            
                                        </RadioGroup>
                                        
                                    </Box>

                                    {/* END DATE */}
                                    <Box sx={{mt:2}}>
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Ngày kết thúc:</Typography>
                                        <DatePicker
                                            value={formData.endDate}
                                            onChange={(newValue) => handleInputChange("endDate", newValue)}
                                            slots={{ textField: TextField }}
                                            slotProps={{ textField: { required: true } }}
                                            enableAccessibleFieldDOMStructure={false}
                                        />
                                    </Box>
                                </Grid>

                            </Grid>
                            

                            {/* MIÊU TẢ */}
                            <Box sx={{mt:2}}>

                                <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Miêu tả:</Typography>
                                <TextField
                                     onChange={(e)=>handleInputChange("description",e.target.value)} value={formData.description}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    maxRows={5}
                                    placeholder="Nhập miêu tả…"
                                    
                                />
                            </Box>
                            {/* NOTE */}
                            <Box sx={{mt:2}}>
                                <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Note thêm:</Typography>
                                <TextField
                                    onChange={(e)=>handleInputChange("additionNotes",e.target.value)} value={formData.additionNotes}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    maxRows={5}
                                    placeholder="Nhập miêu tả…"
                                />
                            </Box>
                            <Grid container spacing={2} sx={{mt:2}}>
                                <Grid item sx={{ xs: 12, md: 6 }}>
                                    <Button
                                                        
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
                                                        HỦY
                                    </Button>
                                </Grid>


                                <Grid item sx={{ xs: 12, md: 6 }}>
                                    <Button
                                        type="submit"
                                        sx={{
                                            
                                            px: {xs: 3, sm: 3.5, md: 4, lg: 4.5 },
                                            py: { xs: 1,sm: 1,md: 1.5,lg: 1.5},
                                            fontSize:{ xs: "0.95rem", sm: "1rem", md: "1rem",lg: "1.1rem" },
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
                                        Thêm TASK
                                    </Button>
                                </Grid>

                            </Grid>
                        </Box>
                    </form>
                </LocalizationProvider>
            </DialogContent>

        </Dialog>
    )
}