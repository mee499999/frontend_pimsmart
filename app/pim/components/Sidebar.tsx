import React from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface SidebarProps {
  items: { 
    text: string; 
    hook: () => void; 
    id: string; // Added an id property for better key assignment
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  // Calculate the maximum width based on the longest text item
  const maxWidth = Math.max(...items.map(item => item.text.length)) * 8; // Adjust multiplier as needed

  return (
    <Box
      sx={{
        backgroundColor: '#2b485f',
        height: '100vh',
        width: maxWidth, // Set width based on the longest item
        minWidth: 250, // Optional: set a minimum width for better usability
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
  );
};

export default Sidebar;
