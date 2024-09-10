"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import logoImage from "/public/pim.jpg";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavbarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Use primary color from the theme
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: 40,
});

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <NavbarContainer>
      <LogoContainer>
        <Image src={logoImage} alt="Logo" height={40} width={40} />
      </LogoContainer>
      <Typography variant="h6" color="white">
        PIMSMART
      </Typography>
      {isMobile ? (
        <>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
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
                <ListItem button component={Link} href="/">
                  <ListItemText primary="สมัคร" />
                </ListItem>
                <ListItem button component={Link} href="/Volunteer">
                  <ListItemText primary="จิตอาสา" />
                </ListItem>
                <ListItem button component={Link} href="/ccc">
                  <ListItemText primary="ต่อทุน" />
                </ListItem>
                <ListItem button component={Link} href="/vv">
                  <ListItemText primary="ข่าวสาร" />
                </ListItem>
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
          <Link href="/Volunteer" passHref>
            <Typography variant="body1" color="white">
              จิตอาสา
            </Typography>
          </Link>
          <Link href="/" passHref>
            <Typography variant="body1" color="white">
              ต่อทุน
            </Typography>
          </Link>
          <Link href="/" passHref>
            <Typography variant="body1" color="white">
            ข่าวสาร
            </Typography>
          </Link>
        </Box>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
