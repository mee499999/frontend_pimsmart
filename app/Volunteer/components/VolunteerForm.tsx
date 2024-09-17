"use client";
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { VolunteerFormProps } from '@/types/IResponse';

const VolunteerForm: React.FC<VolunteerFormProps> = ({
  onSubmit,
  formValues,
  setFormValues,
  success,
  error,
  loading,
  setError,
  setLoading,
  setSuccessMessage,
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
    if (name === "studentId1") {
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
    console.log('----------------------->', formValues);

    try {
      const adjustedFormValues = {
        studentId: formValues.studentId1,
        title: formValues.title, // เพิ่มฟิลด์นี้สำหรับคำนำหน้า
        firstName: formValues.firstName,
        nickname: formValues.nickname,
        graduete: formValues.graduete,
        branch: formValues.branch,
        activityName: formValues.activityName,
        organizationName: formValues.organizationName,
        organizationPhone: formValues.organizationPhone,
        activityDescription: formValues.activityDescription,
        activityDate: formValues.activityDate,
        hours: formValues.hours,
        createDate: formValues.createDate,
        yearLevel: formValues.yearLevel,
        loanStatus: formValues.loanStatus

      };

      await onSubmit(adjustedFormValues); // Ensure onSubmit is a promise-based function

      // Clear form values
      localStorage.removeItem('volunteerForm');
      setFormValues({
        studentId1: '',
        title: '', // เคลียร์ค่านี้ด้วย
        firstName: '',
        yearlevel: '',
        nickname: '',
        graduete: '',
        branch: '',
        activityName: '',
        organizationName: '',
        organizationPhone: '',
        activityDescription: '',
        activityDate: '',
        hours: '',
        loanStatus:'',
        createDate: new Date().toISOString().slice(0, 10),
      });

      // Display success message
      setSuccessMessage("Form submitted successfully!");

    } catch (error) {
      setError('An error occurred while submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
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
              name="studentId1"
              value={formValues.studentId1}
              onChange={handleChange}
              error={studentIdError}
              helperText={studentIdError ? 'Please enter only numbers' : ''}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select

              name="title"
              value={formValues.title}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">เลือกคำนำหน้า</option>
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
              <option value="นาง">นาง</option>
            </TextField>
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
              label="ชื่อเล่น"
              name="nickname"
              value={formValues.nickname}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select

              name="yearlevel"
              value={formValues.yearlevel}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">ชั้นปี</option>
              <option value="นักศึกษาชั้นปีที่1">นักศึกษาชั้นปีที่1</option>
              <option value="นักศึกษาชั้นปีที่2">นักศึกษาชั้นปีที่2</option>
              <option value="นักศึกษาชั้นปีที่3">นักศึกษาชั้นปีที่3</option>
              <option value="นักศึกษาชั้นปีที่4">นักศึกษาชั้นปีที่4</option>
              <option value="นักศึกษาชั้นปีที่5">นักศึกษาชั้นปีที่5</option>
            </TextField>
          </Grid>


          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="เลือกสาขา"
              name="branch"
              value={formValues.branch}  // เช็คให้แน่ใจว่าใน formValues มี field 'branch'
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">เลือกสาขา</option> {/* Default value */}
              <option value="MTM">MTM</option>
              <option value="IMTM">IMTM</option>
              <option value="FBM">FBM</option>
              <option value="RBM">RBM</option>
              <option value="LTM">LTM</option>
              <option value="BC">BC</option>
              <option value="BJ">BJ</option>
              <option value="CEB">CEB</option>
              <option value="CB">CB</option>
              <option value="CJ">CJ</option>
              <option value="DIT">DIT</option>
              <option value="CAI">CAI</option>
              <option value="IE">IE</option>
              <option value="AME">AME</option>
              <option value="RAE">RAE</option>
              <option value="IAM">IAM</option>
              <option value="AVI">AVI</option>
              <option value="HTM">HTM</option>
              <option value="RPM">RPM</option>
              <option value="HROM">HROM</option>
              <option value="FTM">FTM</option>
              <option value="PTM">PTM</option>
              <option value="TCL">TCL</option>
              <option value="ELT">ELT</option>
              <option value="NS">NS</option>
              <option value="HIT">HIT</option>
            </TextField>
          </Grid>


          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="กู้กยศ. หรือไม่" // Label for the dropdown
              name="loanStatus" // Name for the form field
              value={formValues.loanStatus} // Make sure this matches your formValues
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">กู้กยศ. หรือไม่</option> {/* Default value */}
              <option value="yes">กู้กยศ.</option>
              <option value="no">ไม่กู้กยศ.</option>
            </TextField>
          </Grid>




          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ชื่อกิจกรรมจิตอาสา" 
              name="activityName"
              value={formValues.activityName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="หน่วยงาน/เจ้าของงานจิตอาสา"
              name="organizationName"
              value={formValues.organizationName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="เบอร์โทรศัพท์ หน่วยงาน/เจ้าของงานจิตอาสา (ถ้ามี)"
              name="organizationPhone"
              value={formValues.organizationPhone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="รายละเอียดจิตอาสาที่ทำ อธิบาย"
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
              label="วันที่จัดทำกิจกรรม"
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
