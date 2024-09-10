"use client";
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import axiosApi from '@/utils/Api'; // Make sure axiosApi is configured
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

interface VolunteerActivity {
  id: number;
  studentId: string;
  firstName: string;
  activityName: string;
  organizationName: string;
  organizationPhone: string;
  activityDescription: string;
  activityDate: string;
  hours: number;
  createDate: string;
}

const CheckVolunteerHoursForm: React.FC = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [activities, setActivities] = useState<VolunteerActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setActivities([]);

    try {
      // Fetch data from the API
      const response = await axiosApi.get<VolunteerActivity[]>(`/volunteer-activities/student/${studentId}`);
      if (response.data.length === 0) {
        setError('ไม่พบข้อมูลนักศึกษา กรุณาลองใหม่');
      } else {
        setActivities(response.data); // Set activities to the response data
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout contentTitle="ตรวจสอบชั่วโมงจิตอาสา" sidebarItems={[{ text: 'ส่งชั่วโมงจิตอาสา', link: '/volunteer-form' }]}>
      <main>
        <Typography variant="h5" gutterBottom>
          ตรวจสอบชั่วโมงจิตอาสา
        </Typography>
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off" onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          
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

        {/* Display Table if activities are available */}
        {activities.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>กิจกรรม</TableCell>
                  <TableCell>หน่วยงาน</TableCell>
                  <TableCell>โทรศัพท์หน่วยงาน</TableCell>
                  <TableCell>คำอธิบาย</TableCell>
                  <TableCell>วันที่ทำกิจกรรม</TableCell>
                  <TableCell>ชั่วโมงที่ได้</TableCell>
                  <TableCell>วันที่บันทึก</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.activityName}</TableCell>
                    <TableCell>{activity.organizationName}</TableCell>
                    <TableCell>{activity.organizationPhone}</TableCell>
                    <TableCell>{activity.activityDescription}</TableCell>
                    <TableCell>{activity.activityDate}</TableCell>
                    <TableCell>{activity.hours}</TableCell>
                    <TableCell>{activity.createDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </main>
    </Layout>
  );
};

export default CheckVolunteerHoursForm;
