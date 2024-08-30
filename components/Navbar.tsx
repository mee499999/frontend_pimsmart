// Navbar.tsx
"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const NavbarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Typography variant="h6" color="white">
        My Application
      </Typography>
    </NavbarContainer>
  );
};

export default Navbar;
