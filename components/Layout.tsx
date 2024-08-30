// Layout.tsx
"use client";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
import Content from "./Content";
import Sidebar from "./Sidebar";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Content title="Your Title Here">
            {children}
          </Content>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
