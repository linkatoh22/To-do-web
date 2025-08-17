import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  IconButton,
  Box,
  InputAdornment,
  Paper
} from "@mui/material"
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon
} from "@mui/icons-material"
import { useIsMobile } from "../utils/useMobile"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function DashboardHeader({ onMobileMenuToggle,isSidebarCollapsed }) {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const [keyword,setKeyword] = useState("")
  const currentDate = new Date().toLocaleDateString("vi-VN", {
    weekday: isMobile ? undefined : "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const handleSearch = ()=>{
    navigate(`/task/search/${keyword}`)
  }
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  
  return (
    <Paper elevation={1} sx={{ width: "100%" }}>
      <AppBar
         position="fixed"
  elevation={0}
  sx={{
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e0e0e0",
    marginLeft: { md: isSidebarCollapsed ? "80px" : "280px" },
    width: { md: isSidebarCollapsed ? "calc(100% - 80px)" : "calc(100% - 280px)" },
    transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out"
  }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1, px: { xs: 1, sm: 2 } }}>
          {/* Mobile Menu Button + Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton
                onClick={onMobileMenuToggle}
                sx={{
                  color: "#ff4444",
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant={isMobile ? "h6" : "h5"}
              component="div"
              sx={{ fontWeight: "bold", color: "#000" }}
            >
              <span style={{ color: "#ff4444" }}>Dash</span>
              board
            </Typography>
          </Box>

          {/* Search Section - Hidden on mobile */}
         
            <Box sx={{ flexGrow: 1, mx: 4, maxWidth: {
              xs: 250,
              sm: 300,
              md: 350,
              lg: 400
            } }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Nhập từ khóa tìm kiếm..."
                size="small"
                value={keyword}
                onKeyDown={handleKeyDown}
                onChange={(e)=>setKeyword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    "& fieldset": { borderColor: "#e0e0e0" },
                    "&:hover fieldset": { borderColor: "#ff4444" },
                    "&.Mui-focused fieldset": { borderColor: "#ff4444" },
                    "& input": {
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.9rem",
                        md: "1rem",
                        lg: "1.1rem"
                      },
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={()=>handleSearch()}
                        size="small"
                        sx={{
                          backgroundColor: "#ff4444",
                          color: "white",
                          "&:hover": { backgroundColor: "#ff3333" },
                          width: 32,
                          height: 32,
                        }}
                      >
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
         

          {/* Right Section - Icons and Date */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
            {/* Mobile Search Button */}
           

            <IconButton
              onClick={()=>{navigate("/user")}}
              sx={{
                backgroundColor: "#ff4444",
                color: "white",
                "&:hover": { backgroundColor: "#ff3333" },
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
              }}
            >
              <AccountCircleIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>

           

            {/* Date - Hidden on very small screens */}
            <Box sx={{ ml: { xs: 1, sm: 2 }, textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontWeight: 500,
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                {currentDate}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Paper>
  )
}
