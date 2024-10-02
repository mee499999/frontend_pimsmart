import React, { useState, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { fetchVolunteerHours, fetchSpecialWorkHours } from '@/app/api/CheckHour';
import { fetchRankinActivity, RankinResponse } from '@/app/api/Rankin';
import DataTable from '@/components/Table';
import { GridColDef } from '@mui/x-data-grid';
import { VolunteerHoursResponse, SpecialWorkResponse } from '@/types/IResponse';

const CheckHoursWork: React.FC = () => {
  const [studentId, setStudentId] = useState<string>(''); 
  const [volunteerData, setVolunteerData] = useState<VolunteerHoursResponse[]>([]);
  const [specialWorkData, setSpecialWorkData] = useState<SpecialWorkResponse[]>([]);
  const [rankinData, setRankinData] = useState<RankinResponse[] | null>(null); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const totalVolunteerHours = useMemo(() => {
    return volunteerData.reduce((accumulator, item) => {
      return item.hours ? accumulator + Number(item.hours) : accumulator;
    }, 0);
  }, [volunteerData]);

  const totalSpecialWorkHours = useMemo(() => {
    return specialWorkData.reduce((accumulator, item) => {
      return item.hours ? accumulator + Number(item.hours) : accumulator;
    }, 0);
  }, [specialWorkData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!studentId) {
        setError('Student ID is required.');
        return;
    }

    setLoading(true);
    setError(null);

    try {
        // Try fetching volunteer hours
        try {
            const volunteerResponse = await fetchVolunteerHours(studentId);
            setVolunteerData(volunteerResponse);
        } catch (error) {
            console.error('Error fetching volunteer hours:', error);
            setVolunteerData([]); // Set to empty array if error occurs
        }

        // Try fetching special work hours
        try {
            const specialWorkResponse = await fetchSpecialWorkHours(studentId);
            setSpecialWorkData(specialWorkResponse);
        } catch (error) {
            console.error('Error fetching special work hours:', error);
            setSpecialWorkData([]); // Set to empty array if error occurs
        }

        // After fetching volunteer or special work hours, retrieve rankin from the database
        const rankinStudentId = volunteerData.length > 0 
            ? volunteerData[0].studentId 
            : specialWorkData.length > 0 
                ? specialWorkData[0].studentId 
                : null;

        if (rankinStudentId) {
            try {
                const rankinResponse = await fetchRankinActivity(rankinStudentId);
                setRankinData(rankinResponse);
            } catch (error) {
                console.error('Error fetching rankin activity:', error);
                setRankinData(null); // Set to null if error occurs
            }
        } else {
            console.warn('No student ID available for rankin lookup.');
            setRankinData(null);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch volunteer, special work, or ranking data.');
    } finally {
        setLoading(false);
    }
};



  const filteredVolunteerRows = volunteerData
    .filter((item) => item.studentId === studentId)
    .map((item, index) => ({
      id: index,
      studentId: item.studentId,
      firstName: item.firstName,
      activityName: item.activityName,
      organizationName: item.organizationName,
      organizationPhone: item.organizationPhone,
      activityDescription: item.activityDescription,
      activityDate: new Date(item.activityDate).toLocaleDateString(),
      hours: item.hours,
    }));

  const filteredSpecialWorkRows = specialWorkData
    .filter((item) => item.studentId === studentId)
    .map((item, index) => ({
      id: index + volunteerData.length,
      studentId: item.studentId,
      firstName: item.firstName,
      workName: item.workName,
      organizationName: item.organizationName,
      organizationPhone: item.organizationPhone,
      workDescription: item.workDescription,
      workDate: new Date(item.workDate).toLocaleDateString(),
      hours: item.hours,
    }));

  const volunteerColumns: GridColDef[] = [
    { field: 'studentId', headerName: 'รหัสนักศึกษา', width: 175 },
    { field: 'firstName', headerName: 'ชื่อ-นามสกุล', width: 150 },
    { field: 'activityName', headerName: 'ชื่อกิจกรรมจิตอาสา', width: 200 },
    { field: 'organizationName', headerName: 'ชื่อองค์กร', width: 180 },
    { field: 'organizationPhone', headerName: 'เบอร์โทรองค์กร', width: 150 },
    { field: 'activityDescription', headerName: 'รายละเอียดกิจกรรม', width: 250 },
    { field: 'activityDate', headerName: 'วันที่จัดกิจกรรม', width: 150 },
    { field: 'hours', headerName: 'จำนวนชั่วโมง', width: 100 },
  ];

  const specialWorkColumns: GridColDef[] = [
    { field: 'workName', headerName: 'ชื่อกิจกรรมพิเศษ', width: 200 },
    { field: 'organizationName', headerName: 'ชื่อองค์กร', width: 180 },
    { field: 'organizationPhone', headerName: 'เบอร์โทรองค์กร', width: 150 },
    { field: 'workDescription', headerName: 'รายละเอียดกิจกรรมพิเศษ', width: 250 },
    { field: 'workDate', headerName: 'วันที่จัดกิจกรรม', width: 150 },
    { field: 'hours', headerName: 'จำนวนชั่วโมง', width: 100 },
  ];

  return (
    <main>
      <Typography variant="h5" gutterBottom>
        ตรวจสอบชั่วโมงจิตอาสาและกิจกรรมพิเศษ พร้อมอันดับ
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

      <Box sx={{ mt: 3 }}>
        {volunteerData.length > 0 && (
          <Typography variant="h6">
            Total Volunteer Hours: {totalVolunteerHours} / 32 
          </Typography>
        )}
        {volunteerData.length > 0 && totalVolunteerHours < 32 && (
          <Typography variant="h6">
            คุณมี {totalVolunteerHours} ชั่วโมงอาสา และเหลืออีก {32 - totalVolunteerHours} ชั่วโมง เพื่อให้ครบ 32 ชั่วโมง
          </Typography>
        )}
        {volunteerData.length > 0 && totalVolunteerHours >= 32 && (
          <Typography variant="h6">
            คุณมี {totalVolunteerHours} ชั่วโมงอาสา คุณครบ 32 ชั่วโมงแล้ว!
          </Typography>
        )}
        {specialWorkData.length > 0 && (
          <Typography variant="h6">Total Special Work Hours: {totalSpecialWorkHours}</Typography>
        )}
        {rankinData && rankinData.length > 0 && (
          <Typography variant="h6">Rankin: {rankinData[0]?.rank}</Typography>
        )}
      </Box>

      <Box sx={{ mt: 3, display: 'flex', gap: 3, justifyContent: 'space-between' }}>
        {/* Show Volunteer Hours table if there is data */}
        {volunteerData.length > 0 && (
          <Box sx={{ width: '50%' }}>
            <Typography variant="h6">Volunteer Hours</Typography>
            <DataTable rows={filteredVolunteerRows} columns={volunteerColumns} />
          </Box>
        )}

        {/* Show Special Work Hours table if there is data */}
        {specialWorkData.length > 0 && (
          <Box sx={{ width: '50%' }}>
            <Typography variant="h6">Special Work Hours</Typography>
            <DataTable rows={filteredSpecialWorkRows} columns={specialWorkColumns} />
          </Box>
        )}
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
    </main>
  );
};

export default CheckHoursWork;
