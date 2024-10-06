import React from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";

interface SidebarProps {
  items: { 
    text: string; 
    hook: () => void; 
    id: string; // Added an id property for better key assignment
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {/* Mobile Menu Icon */}
      {isMobile && (
        <Box display="flex" justifyContent="flex-end" p={2}>
          <IconButton onClick={toggleDrawer(true)} color="inherit" aria-label="open menu">
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        transitionDuration={300} // Added transition duration for smoother opening
      >
        <Box sx={{ backgroundColor: '#2b485f', height: '100%' }}>
          <List>
            {items.map((item) => (
              <ListItem button key={item.id} onClick={item.hook} aria-label={item.text}>
                <ListItemText 
                  primary={
                    <Typography sx={{ fontSize: '18px', color: 'white' }}>
                      {item.text}
                    </Typography>
                  } 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Sidebar for Desktop */}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#2b485f',
            height: '100vh',
            width: 250, // Define a width for desktop sidebar
          }}
        >
          <List>
            {items.map((item) => (
              <ListItem button key={item.id} onClick={item.hook} aria-label={item.text}>
                <ListItemText 
                  primary={
                    <Typography sx={{ fontSize: '18px', color: 'white' }}>
                      {item.text}
                    </Typography>
                  } 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
