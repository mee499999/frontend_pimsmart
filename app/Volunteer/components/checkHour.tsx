"use client";

import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchVolunteerHours } from '@/app/api/CheckHour'; // Import the fetch function
import { VolunteerHoursResponse } from '@/types/IResponse'; 

const CheckHoursWork: React.FC = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [data, setData] = useState<VolunteerHoursResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Calculate total hours using useMemo
  const totalHours = useMemo(() => {
    return data.reduce((accumulator, item) => {
      if (item.hours != null) {
        return accumulator + Number(item.hours);
      }
      return accumulator;
    }, 0);
  }, [data]);

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    setError(null);

    try {
      const response = await fetchVolunteerHours(studentId);
      console.log('Response:', response);
      
      setData(response); // Set data directly if response is an array
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

      {/* Display total hours */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">
          Total Hours: {totalHours}
        </Typography>
      </Box>

      {/* Display data below the form */}
      <Box sx={{ mt: 3 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {data.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Activity Name</TableCell>
                  <TableCell>Organization Name</TableCell>
                  <TableCell>Organization Phone</TableCell>
                  <TableCell>Activity Description</TableCell>
                  <TableCell>Activity Date</TableCell>
                  <TableCell>Hours</TableCell>
                  {/* <TableCell>Create Date</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.studentId}</TableCell>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.activityName}</TableCell>
                    <TableCell>{item.organizationName}</TableCell>
                    <TableCell>{item.organizationPhone}</TableCell>
                    <TableCell>{item.activityDescription}</TableCell>
                    <TableCell>{item.activityDate}</TableCell>
                    <TableCell>{item.hours}</TableCell>
                    {/* <TableCell>{item.createDate}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No data available</Typography>
        )}
      </Box>
    </main>
  );
};

export default CheckHoursWork;
