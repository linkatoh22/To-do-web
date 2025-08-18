import styled from "styled-components";
import DashboardHeader from "./components/Menu";
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useIsMobile } from "./utils/useMobile"
import SidebarNavigation from "./components/Sidebar";
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
} from "@mui/material"
const ContentWrapper  = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  z-index: 5; 
  transition: opacity 0.3s ease;
`;
export default function RootLayout(){
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const isMobile = useIsMobile()

    const handleToggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false)
    }

    // Auto-collapse sidebar on mobile
    useEffect(() => {
        if (isMobile) {
        setIsSidebarCollapsed(false) // Reset collapse state on mobile
        }
    }, [isMobile])
    return(
        <div style={{ display: "flex",width: "100%", minHeight: "100vh"}}>
            <SidebarNavigation 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
            isMobileOpen={isMobileMenuOpen}
            onMobileClose={handleMobileMenuClose} />
            
            {/* MENU */}
            <Box
                sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                marginLeft: {
                    xs: 0,
                    md: isSidebarCollapsed ? "80px" : "280px",
                },
                transition: "margin-left 0.3s ease-in-out",
                }}
            >
                    
                        <DashboardHeader onMobileMenuToggle={handleMobileMenuToggle} 
                        isSidebarCollapsed={isSidebarCollapsed}
                        ></DashboardHeader>
                    

                    <Box
                        sx={{
                            flexGrow: 1,
                            backgroundColor: "#f5f5f5",
                            overflow: "auto",
                            
                            marginTop: "80px", // Account for fixed header height
                            // minHeight: "calc(100vh - 64px)",
                        }}
                    >
                        <Outlet />
                    </Box>
                
            </Box>
           
        </div>
    )
}