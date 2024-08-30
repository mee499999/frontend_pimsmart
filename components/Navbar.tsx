"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import logoImage from "/public/pim.jpg";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useMediaQuery, useTheme } from "@mui/material";

const NavbarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const Logo = styled(Image)(({ theme }) => ({
  height: 40,
}));

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <NavbarContainer>
      <Logo src={logoImage} alt="Logo" height={40} width={40} />
      <Typography variant="h6" color="white">
        My Application
      </Typography>
      {isMobile ? (
        <>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItem button component="a" href="/">
                  <ListItemText primary="สมัคร" />
                </ListItem>
                <ListItem button component="a" href="/volunteer">
                  <ListItemText primary="จิตอาสา" />
                </ListItem>
                {/* Add more menu items here */}
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <Box display="flex" gap={2}>
          <Link href="/" passHref>
            <Typography variant="body1" color="white">
              สมัคร
            </Typography>
          </Link>
          <Link href="/volunteer" passHref>
            <Typography variant="body1" color="white">
              จิตอาสา
            </Typography>
          </Link>
          {/* Add more links here if needed */}
        </Box>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
