import styled from "styled-components";
import DashboardHeader from "./components/Menu";
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useIsMobile } from "./utils/useMobile"
import SidebarNavigation from "./components/Sidebar";
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
        <div style={{ display: "flex",width: "100%"}}>
            <SidebarNavigation 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
            isMobileOpen={isMobileMenuOpen}
            onMobileClose={handleMobileMenuClose} />
            
            {/* MENU */}
            <ContentWrapper >
                    
                    <DashboardHeader onMobileMenuToggle={handleMobileMenuToggle}></DashboardHeader>
                    
                    <Outlet />
                
            </ContentWrapper>
           
        </div>
    )
}