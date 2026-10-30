
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, md: 4 },
          backgroundColor: "#f5f7fb"
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
