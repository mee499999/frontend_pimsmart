import React, { useState, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { fetchVolunteerHours, fetchSpecialWorkHours } from '@/app/api/CheckHour'; // Import fetch functions
import { fetchRankinActivity, RankinResponse } from '@/app/api/Rankin'; // Import rankin fetch function
import DataTable from '@/components/Table'; // Import your DataTable component
import Loading from '@/components/Loading'; // Ensure you have a Loading component
import { GridColDef } from '@mui/x-data-grid';
import { VolunteerHoursResponse, SpecialWorkResponse } from '@/types/IResponse';

const CheckHoursWork: React.FC = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [volunteerData, setVolunteerData] = useState<VolunteerHoursResponse[]>([]);
  const [specialWorkData, setSpecialWorkData] = useState<SpecialWorkResponse[]>([]);
  const [rankinData, setRankinData] = useState<RankinResponse[] | null>(null); // For rankin data
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

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
    event.preventDefault(); // Prevent default form submission behavior
    if (!studentId) {
      setError('Student ID is required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch volunteer hours, special work hours, and ranking in parallel
      const [volunteerResponse, specialWorkResponse, rankinResponse] = await Promise.all([
        fetchVolunteerHours(studentId),
        fetchSpecialWorkHours(studentId),
        fetchRankinActivity(), // Fetch the ranking data only on submit
      ]);

      setVolunteerData(volunteerResponse); // Set volunteer data
      setSpecialWorkData(specialWorkResponse); // Set special work data
      setRankinData(rankinResponse); // Set rankin data
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch volunteer, special work hours, or ranking data.');
    } finally {
      setLoading(false);
    }
  };

  const volunteerRows = volunteerData.map((item, index) => ({
    id: index, // Ensure `id` is unique (replace with item.id if available)
    studentId: item.studentId,
    firstName: item.firstName,
    activityName: item.activityName,
    organizationName: item.organizationName,
    organizationPhone: item.organizationPhone,
    activityDescription: item.activityDescription,
    activityDate: new Date(item.activityDate).toLocaleDateString(),
    hours: item.hours,
  }));

  const specialWorkRows = specialWorkData.map((item, index) => ({
    id: index + volunteerData.length, // Ensure unique id for rows
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
    { field: 'studentId', headerName: 'รหัสนักศึกษา', width: 175 },
    { field: 'firstName', headerName: 'ชื่อ-นามสกุล', width: 150 },
    { field: 'workName', headerName: 'ชื่อกิจกรรมพิเศษ', width: 200 },
    { field: 'organizationName', headerName: 'ชื่อองค์กร', width: 180 },
    { field: 'organizationPhone', headerName: 'เบอร์โทรองค์กร', width: 150 },
    { field: 'workDescription', headerName: 'รายละเอียดกิจกรรมพิเศษ', width: 250 },
    { field: 'workDate', headerName: 'วันที่จัดกิจกรรม', width: 150 },
    { field: 'hours', headerName: 'จำนวนชั่วโมง', width: 100 },
  ];

  const rankinColumns: GridColDef[] = [
    { field: 'rank', headerName: 'อันดับ', width: 100 },
    { field: 'studentId', headerName: 'รหัสนักศึกษา', width: 175 },
    { field: 'totalHours', headerName: 'จำนวนชั่วโมงทั้งหมด', width: 150 },
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

      {/* Display total hours */}
      <Box sx={{ mt: 3 }}>
        {volunteerData.length > 0 && (
          <Typography variant="h6">
            Total Volunteer Hours: {totalVolunteerHours}
          </Typography>
        )}
        {specialWorkData.length > 0 && (
          <Typography variant="h6">
            Total Special Work Hours: {totalSpecialWorkHours}
          </Typography>
        )}
      </Box>

      {/* Display volunteer and special work hours in tables */}
      <Box sx={{ mt: 3, height: 400, width: '100%' }} ref={tableRef}>
        <Loading open={loading} containerRef={tableRef} />
        {volunteerData.length > 0 && (
          <>
            <Typography variant="h6">Volunteer Hours</Typography>
            <DataTable rows={volunteerRows} columns={volunteerColumns} />
          </>
        )}
        {specialWorkData.length > 0 && (
          <>
            <Typography variant="h6">Special Work Hours</Typography>
            <DataTable rows={specialWorkRows} columns={specialWorkColumns} />
          </>
        )}
        {rankinData && rankinData.length > 0 && (
          <>
            <Typography variant="h6">Ranking</Typography>
            <DataTable rows={rankinData.map((rank, index) => ({ id: index, ...rank }))} columns={rankinColumns} />
          </>
        )}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </main>
  );
};

export default CheckHoursWork;
