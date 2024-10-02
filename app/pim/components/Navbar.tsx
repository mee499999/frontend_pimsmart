import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import logoImage from "/public/pim-Logo.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button"; // Import Button for logout
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

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
  height: 100,
});

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter(); // Initialize router

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    // Clear the token from session storage and redirect to login
    sessionStorage.removeItem("token");
    router.push("/pim/login"); // Redirect to login page after logout
  };

  const navItems = [
    { href: '/register', text: 'สมัคร' },
    { href: '/Volunteer', text: 'จิตอาสา' },
    { href: '/ccc', text: 'ต่อทุน' },
    { href: '/vv', text: 'ข่าวสาร' }
  ];

  return (
    <NavbarContainer>
      <LogoContainer>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            flexDirection: { xs: 'column', sm: 'row' }, // Column for mobile, row for larger screens
            ml: { sm: '30px' },
          }}
        >
          <Link href="/" passHref>
            <Box className="flex items-center text-white">
              <Image src={logoImage} alt="Logo" height={100} width={100} />
            </Box>
          </Link>
          <Typography
            variant="h6"
            color="white"
            component="a"
            href="/"
            sx={{
              textDecoration: 'none',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, // Adjust font size
              mt: { xs: '10px', sm: '0' }, // Margin-top for spacing on mobile
              ml: { xs: '0', sm: '10px' }, // No margin-left on mobile
            }}
          >
            PIMSMART
          </Typography>
        </Box>
      </LogoContainer>

      {isMobile ? (
        <>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu" sx={{ marginTop: '20px' }}>
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
                {navItems.map(({ href, text }, index) => (
                  <ListItem button component={Link} href={href} key={index}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" /> {/* Logout button in mobile drawer */}
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <Box display="flex" gap={2} alignItems="center">
          {navItems.map(({ href, text }, index) => (
            <Typography
              key={index}
              variant="h6"
              color="white"
              component="a"
              href={href}
              sx={{ textDecoration: 'none', fontSize: { sm: '1rem', md: '2rem' }, marginLeft: '10px' }}
            >
              {text}
            </Typography>
          ))}
          <LogoutIcon
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontSize: { sm: '1rem', md: '2rem' },
              cursor: 'pointer' // Change cursor to pointer when hovering
            }}
          >
            Logout {/* Logout button for desktop */}
          </LogoutIcon>

        </Box>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
