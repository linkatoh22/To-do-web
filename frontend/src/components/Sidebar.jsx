"use client"

import { useState } from "react"
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
import {
  Dashboard as DashboardIcon,
  PriorityHigh as VitalTaskIcon,
  Assignment as MyTaskIcon,
  Category as TaskCategoriesIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material"
import { useIsMobile } from "../utils/useMobile"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { id: "vital-task", label: "Vital Task", icon: <VitalTaskIcon /> },
  { id: "my-task", label: "My Task", icon: <MyTaskIcon /> },
  { id: "task-categories", label: "Task Categories", icon: <TaskCategoriesIcon /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon /> },
  { id: "help", label: "Help", icon: <HelpIcon /> },
]

export default function SidebarNavigation({ isCollapsed, onToggleCollapse, isMobileOpen = false, onMobileClose }) {
  const [activeItem, setActiveItem] = useState("dashboard")
  const isMobile = useIsMobile()

  const handleMenuClick = (itemId) => {
    if (itemId === "logout") {
      console.log("Logout clicked")
      return
    }
    setActiveItem(itemId)
    if (isMobile && onMobileClose) {
      onMobileClose()
    }
  }

  const sidebarContent = (
    <Box
      sx={{
        
        width: isMobile ? 280 : isCollapsed ? 80 : 280,
        height: "100vh",
        backgroundColor: "#ff5757",
        color: "white",
        display: "flex",
        flexDirection: "column",
        transition: isMobile ? "none" : "width 0.3s ease-in-out",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: isCollapsed && !isMobile ? 3 : 3, textAlign: "center" }}>
        {!isMobile && (
          <Box sx={{ display: "flex", justifyContent: isCollapsed ? "center" : "flex-end", mb: 2 }}>
            <IconButton
              onClick={onToggleCollapse}
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>
        )}
        {(!isCollapsed || isMobile) && (
          <>
            <Avatar
              src="/placeholder.svg?height=80&width=80"
              sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                mx: "auto",
                mb: 2,
                border: "3px solid rgba(255, 255, 255, 0.3)",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 0.5,
                color: "white",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              Sundar Gurung
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
              }}
            >
              sundar.gurung@gmail.com
            </Typography>
          </>
        )}
      </Box>

      <Box sx={{ flexGrow: 1, px: isCollapsed && !isMobile ? 1 : 2 }}>
        <List sx={{ py: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <Tooltip title={isCollapsed && !isMobile ? item.label : ""} placement="right" arrow>
                <ListItemButton
                  onClick={() => handleMenuClick(item.id)}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: activeItem === item.id ? "rgba(255, 255, 255, 1)" : "transparent",
                    color: activeItem === item.id ? "#ff5757" : "white",
                    "&:hover": {
                      backgroundColor: activeItem === item.id ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.1)",
                    },
                    py: { xs: 1.2, sm: 1.5 },
                    px: isCollapsed && !isMobile ? 1 : 2,
                    justifyContent: isCollapsed && !isMobile ? "center" : "flex-start",
                    minHeight: { xs: 44, sm: 48 },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: activeItem === item.id ? "#ff5757" : "white",
                      minWidth: isCollapsed && !isMobile ? "auto" : 40,
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {(!isCollapsed || isMobile) && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: activeItem === item.id ? "bold" : "normal",
                        fontSize: { xs: "0.9rem", sm: "0.95rem" },
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: isCollapsed && !isMobile ? 1 : 2, mt: "auto" }}>
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", mb: 2 }} />
        <Tooltip title={isCollapsed && !isMobile ? "Logout" : ""} placement="right" arrow>
          <ListItemButton
            onClick={() => handleMenuClick("logout")}
            sx={{
              borderRadius: "8px",
              color: "white",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              py: { xs: 1.2, sm: 1.5 },
              px: isCollapsed && !isMobile ? 1 : 2,
              justifyContent: isCollapsed && !isMobile ? "center" : "flex-start",
              minHeight: { xs: 44, sm: 48 },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: isCollapsed && !isMobile ? "auto" : 40,
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {(!isCollapsed || isMobile) && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  )

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            border: "none",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      {sidebarContent}
    </Paper>
  )
}
