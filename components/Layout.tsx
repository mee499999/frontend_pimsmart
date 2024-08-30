// components/Layout.tsx
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";

interface LayoutProps {
  children: React.ReactNode;
  sidebarItems?: { text: string; link: string }[];
  contentTitle: string; // เพิ่ม contentTitle
}

const Layout: React.FC<LayoutProps> = ({ children, sidebarItems, contentTitle }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={2}>
          <Sidebar items={sidebarItems || []} />
        </Grid>
        <Grid item xs={10}>
          <Content title={contentTitle}>{children}</Content>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
