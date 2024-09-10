// src/components/SpecialWorkForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const SpecialWorkForm: React.FC = () => {
  const [workTitle, setWorkTitle] = useState('');
  const [workDescription, setWorkDescription] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(`Title: ${workTitle}, Description: ${workDescription}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', my: 4 }}
    >
      <Typography variant="h6" gutterBottom>
        ส่งงานพิเศษ
      </Typography>
      <TextField
        label="หัวข้อ"
        value={workTitle}
        onChange={(e) => setWorkTitle(e.target.value)}
        required
      />
      <TextField
        label="รายละเอียด"
        multiline
        rows={4}
        value={workDescription}
        onChange={(e) => setWorkDescription(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        ส่ง
      </Button>
    </Box>
  );
};

export default SpecialWorkForm;
