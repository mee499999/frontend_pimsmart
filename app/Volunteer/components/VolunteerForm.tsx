"use client";
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface VolunteerFormProps {
  onSubmit: (formValues: any) => void;
  formValues: any;
  setFormValues: React.Dispatch<React.SetStateAction<any>>;
  success: string | null;
  error: string | null;
  loading: boolean;
}

const VolunteerForm: React.FC<VolunteerFormProps> = ({
  onSubmit,
  formValues,
  setFormValues,
  success,
  error,
  loading,
}) => {
  const [studentIdError, setStudentIdError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const savedFormData = localStorage.getItem('volunteerForm');
    if (savedFormData) {
      setFormValues(JSON.parse(savedFormData));
    }
  }, [setFormValues]);

  React.useEffect(() => {
    localStorage.setItem('volunteerForm', JSON.stringify(formValues));
  }, [formValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'studentId') {
      if (/^\d*$/.test(value)) {
        setStudentIdError(false);
        setFormValues({ ...formValues, [name]: value });
      } else {
        setStudentIdError(true);
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formValues);
  };

  return (
    <main>
      <Typography variant="h5" gutterBottom>
        บันทึกชั่วโมงจิตอาสา
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
              helperText={studentIdError ? 'Please enter only numbers' : ''}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ชื่อ-นามสกุล"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ชื่อกิจกรรมที่ทำ"
              name="activityName"
              value={formValues.activityName}
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
              label="เบอร์โทร องค์กร"
              name="organizationPhone"
              value={formValues.organizationPhone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="รายละเอียดจิตอาสา"
              name="activityDescription"
              value={formValues.activityDescription}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="วันที่-จัดทำกิจกรรม"
              name="activityDate"
              value={formValues.activityDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="จำนวนชั่วโมง"
              name="hours"
              value={formValues.hours}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="วันที่บันทึก"
              name="createDate"
              value={formValues.createDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </Box>
    </main>
  );
};

export default VolunteerForm;
