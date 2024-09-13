"use client";

import React, { useState, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { fetchVolunteerHours } from '@/app/api/CheckHour'; // Import the fetch function
import { VolunteerHoursResponse } from '@/types/IResponse';
import DataTable from '@/components/Table'; // Import your DataTable component
import Loading from '@/components/Loading'; // Ensure you have a Loading component
import { GridColDef } from '@mui/x-data-grid';

const CheckHoursWork: React.FC = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [data, setData] = useState<VolunteerHoursResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const totalHours = useMemo(() => {
    return data.reduce((accumulator, item) => {
      return item.hours ? accumulator + Number(item.hours) : accumulator;
    }, 0);
  }, [data]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (!studentId) {
      setError('Student ID is required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetchVolunteerHours(studentId);
      console.log('Fetched Data:', response);
      
      setData(response); // Set data directly if response is an array
    } catch (error) {
      console.error('Error fetching volunteer hours:', error);
      setError('Failed to fetch volunteer hours.');
    } finally {
      setLoading(false);
    }
  };

  const rows = data.map((item) => ({
    id: item.id, // Ensure `id` is unique
    studentId: item.studentId,
    firstName: item.firstName,
    activityName: item.activityName,
    organizationName: item.organizationName,
    organizationPhone: item.organizationPhone,
    activityDescription: item.activityDescription,
    activityDate: new Date(item.activityDate).toLocaleDateString(),
    hours: item.hours,
  }));

  const columns: GridColDef[] = [
    { field: 'studentId', headerName: 'Student ID', width: 175 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'activityName', headerName: 'Activity Name', width: 200 },
    { field: 'organizationName', headerName: 'Organization Name', width: 180 },
    { field: 'organizationPhone', headerName: 'Organization Phone', width: 150 },
    { field: 'activityDescription', headerName: 'Activity Description', width: 250 },
    { field: 'activityDate', headerName: 'Activity Date', width: 150 },
    { field: 'hours', headerName: 'Hours', width: 100 },
  ];

  return (
    <main>
      <Typography variant="h5" gutterBottom>
        ตรวจสอบชั่วโมงจิตอาสา
      </Typography>
      <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="รหัสนักศึกษา"
          name="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
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
      <Box sx={{ mt: 3, height: 400, width: '100%' }} ref={tableRef}>
        <Loading open={loading} containerRef={tableRef} />
        <DataTable rows={rows} columns={columns} />
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </main>
  );
};

export default CheckHoursWork;
