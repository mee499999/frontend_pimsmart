"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fetchVolunteerHours } from '@/app/api/CheckHour'; // Import the fetch function

const CheckHoursForm: React.FC = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [hours, setHours] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    setError(null);

    try {
      const response = await fetchVolunteerHours(studentId);
      setHours(response.hours);
    } catch (error) {
      console.error('Error fetching volunteer hours:', error);
      setError('Failed to fetch volunteer hours.');
    } finally {
      setLoading(false);
    }
  };

  return (
   
      <main>
        <Typography variant="h5" gutterBottom>
          ตรวจสอบชั่วโมงจิตอาสา
        </Typography>
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off" onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          {hours !== null && <Alert severity="success">ชั่วโมงจิตอาสา: {hours}</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="รหัสนักศึกษา"
                name="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'ตรวจสอบ'}
            </Button>
          </Box>
        </Box>
      </main>
   
  );
};

export default CheckHoursForm;
