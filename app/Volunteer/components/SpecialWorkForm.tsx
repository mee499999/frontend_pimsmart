"use client";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SpecialWoekFormProps } from '@/types/IResponse'; // Adjust the import path as needed

const defaultFormValues = {
  studentId: '',
  fullName: '',
  workName: '',
  organizationName: '',
  workType: '',
  workDescription: '',
  compensation: '',
  workDates: '',
  workTime: '',
  createDate: new Date().toISOString().slice(0, 10),
};

const SpecialWork: React.FC<SpecialWoekFormProps> = ({
  onSubmit,
  data = defaultFormValues,
  success,
  error,
  loading,
  setError,
  setLoading,
  setSuccessMessage,
  setFormValues = () => {},
}) => {
  const [formValues, setFormValuesState] = useState(data);
  const [studentIdError, setStudentIdError] = useState(false);

  useEffect(() => {
    const savedFormData = localStorage.getItem('specialWorkForm');
    if (savedFormData) {
      setFormValuesState(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('specialWorkForm', JSON.stringify(formValues));
  }, [formValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'studentId') {
      if (/^\d*$/.test(value)) {
        setStudentIdError(false);
        setFormValuesState({ ...formValues, [name]: value });
      } else {
        setStudentIdError(true);
      }
    } else {
      setFormValuesState({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formValues);

      // Clear form values
      localStorage.removeItem('specialWorkForm');
      setFormValuesState(defaultFormValues);

      // Display success message
      setSuccessMessage('Form submitted successfully!');
    } catch (error) {
      setError('An error occurred while submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Typography variant="h5" gutterBottom>
        บันทึกข้อมูลการทำงานพิเศษ
      </Typography>
      <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off" onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="รหัสนักศึกษา"
              name="studentId"
              value={formValues.studentId}
              onChange={handleChange}
              error={studentIdError}
              helperText={studentIdError ? 'กรุณากรอกตัวเลขเท่านั้น' : ''}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ชื่อ-นามสกุล"
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ชื่อกิจกรรม"
              name="workName"
              value={formValues.workName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ชื่อองค์กร"
              name="organizationName"
              value={formValues.organizationName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="ประเภทงาน"
              name="workType"
              value={formValues.workType}
              onChange={handleChange}
              SelectProps={{ native: true }}
            >
              <option value="">เลือกประเภทงาน</option>
              <option value="งานพิเศษ">งานพิเศษ</option>
              <option value="งานประจำ">งานประจำ</option>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="รายละเอียดงาน"
              name="workDescription"
              value={formValues.workDescription}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ค่าตอบแทน"
              name="compensation"
              type="number"
              value={formValues.compensation}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="วัน-เดือน-ปี"
              name="workDates"
              value={formValues.workDates}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="เวลา"
              name="workTime"
              value={formValues.workTime}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="flex-end" mt={2}>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
};

export default SpecialWork;
