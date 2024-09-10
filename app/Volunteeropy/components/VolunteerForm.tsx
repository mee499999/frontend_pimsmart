// src/components/VolunteerForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const VolunteerForm: React.FC = () => {
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
      <Typography variant="h6" gutterBottom>
        ส่งชั่วโมงจิตอาสา
      </Typography>
      <TextField
        label="ชื่อ"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="ชั่วโมง"
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        ส่ง
      </Button>
    </Box>
  );
};

export default VolunteerForm;
