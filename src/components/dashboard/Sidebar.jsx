import { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ResponsiveSidebar from "./ResponsiveSidebar";

const drawerWidth = 230;

export default function Sidebar() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // true on desktop
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((s) => !s);

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar only on small screens (mobile / tablet) */}
      {!isMdUp && (
        <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 2 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: 700 }}
            >
              Health Care
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar component handles both permanent and temporary Drawer */}
      <ResponsiveSidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
      />

      {/* Main content area:
          - On md+ add left margin equal to drawerWidth so content won't be overlapped
          - On small screens no margin because drawer is temporary (overlay)
      */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // This ensures the content moves right on desktop so it's not behind the permanent drawer
          ml: { md: `${drawerWidth}px` },
        }}
      >
        {/* Only add a spacer when AppBar exists (mobile/tablet) */}
        {!isMdUp && <Toolbar />}

        <Outlet />
      </Box>
    </Box>
  );
}
