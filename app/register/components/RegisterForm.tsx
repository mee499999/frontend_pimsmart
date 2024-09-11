import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { Student } from '@/types/IResponse';

interface RegisterFormProps {
  student: Student | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ student }) => {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');

  // Update form fields if student data is provided
  useEffect(() => {
    if (student) {
      setStudentId(student.studentId || '');
      setFirstName(student.firstName || '');
    }
  }, [student]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(`Student ID: ${studentId}, First Name: ${firstName}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', my: 4 }}
    >
      <Typography color="secondary" align="center" sx={{ mt: 2 }}>
        ข้อมูลของท่านยังไม่มีในระบบ
      </Typography>
      <TextField
        fullWidth
        label="รหัสนักศึกษา"
        name="studentId"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        fullWidth
        label="ชื่อ-นามสกุล"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        variant="outlined"
        required
      />
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
