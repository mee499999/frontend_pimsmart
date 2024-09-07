// components/Layout.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Content from './Content';
import FontLinks from './FontLinks'; // Import the FontLinks component

interface LayoutProps {
  children: React.ReactNode;
  sidebarItems?: { text: string; link: string }[];
  contentTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ children, sidebarItems, contentTitle }) => {
  return (
    <>
      <FontLinks /> {/* Use the FontLinks component */}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <Grid container sx={{ flexGrow: 1 }}>
          {sidebarItems && sidebarItems.length > 0 && (
            <Grid item xs={2}>
              <Sidebar items={sidebarItems} />
            </Grid>
          )}
          <Grid item xs={sidebarItems && sidebarItems.length > 0 ? 10 : 12}>
            <Content title={contentTitle}>{children}</Content>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Layout;
