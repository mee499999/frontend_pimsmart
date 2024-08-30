// Content.tsx
"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ContentProps {
  title: string;
  children?: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ title, children }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Box>
  );
};

export default Content;
