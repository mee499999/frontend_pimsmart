import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { Student } from '@/types/IResponse';

interface RegisterFormProps {
  student: Student | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ student }) => {
  // Initialize state for all fields
  const initialState = {
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    faculty: '',
    fieldOfStudy: '',
    currentlyStudyingYear: '',
    dateOfBirth: '',
    gender: '',
    studentType: '',
    prefix: '',
    congenitalDisease: '',
    block: '',
    currentGpa: '',
    nationalId: ''
  };

  const [formValues, setFormValues] = useState(initialState);

  useEffect(() => {
    if (student) {
      setFormValues({
        studentId: student.studentId || '',
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        phoneNumber: student.phoneNumber || '',
        faculty: student.faculty || '',
        fieldOfStudy: student.fieldOfStudy || '',
        currentlyStudyingYear: student.currentlyStudyingYear || '',
        dateOfBirth: student.dateOfBirth || new Date().toISOString().split('T')[0], // Set default date to today
        gender: student.gender || '',
        studentType: student.studentType || '',
        prefix: student.prefix || '',
        congenitalDisease: student.congenitalDisease || '',
        block: student.block || '',
        currentGpa: student.currentGpa || '',
        nationalId: student.nationalId || ''
      });
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);

    try {
      // Replace with your API call
      // await axios.post('/api/register', formValues);
      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const fields = [
    { label: 'รหัสนักศึกษา', name: 'studentId' },
    { label: 'ชื่อ', name: 'firstName' },
    { label: 'นามสกุล', name: 'lastName' },
    { label: 'อีเมล', name: 'email' },
    { label: 'หมายเลขโทรศัพท์', name: 'phoneNumber' },
    { label: 'คณะ', name: 'faculty' },
    { label: 'สาขาวิชา', name: 'fieldOfStudy' },
    { label: 'ปีที่ศึกษาอยู่', name: 'currentlyStudyingYear' },
    { label: 'วันเกิด', name: 'dateOfBirth', type: 'date' },
    { label: 'เพศ', name: 'gender' },
    { label: 'ประเภทนักศึกษา', name: 'studentType' },
    { label: 'คำนำหน้า', name: 'prefix' },
    { label: 'โรคประจำตัว', name: 'congenitalDisease' },
    { label: 'บล็อก', name: 'block' },
    { label: 'GPA ปัจจุบัน', name: 'currentGpa' },
    { label: 'หมายเลขบัตรประชาชน', name: 'nationalId' }
  ];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, mx: 'auto', my: 4 }}
    >
      <Typography color="secondary" align="center" sx={{ mt: 2 }}>
        ข้อมูลของท่านยังไม่มีในระบบ
      </Typography>
      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid item xs={12} md={6} key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              value={formValues[field.name as keyof typeof formValues]}
              onChange={handleChange}
              variant="outlined"
              type={field.type || 'text'}
              required={['studentId', 'firstName', 'lastName', 'email'].includes(field.name)}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        ส่งข้อมูล
      </Button>
    </Box>
  );
};

export default RegisterForm;
