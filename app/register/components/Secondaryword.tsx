
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const Secondaryword: React.FC = () => {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(`Name: ${name}, Hours: ${hours}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', my: 4 }}
    >
      
      <TextField
        label="ชื่อ"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      

    </Box>
  );
};

export default Secondaryword;
