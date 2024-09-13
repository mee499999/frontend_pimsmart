import React from 'react';
import { UseFormReturn } from 'react-hook-form'; // Ensure this import is included
import { TextField, Button, Typography, Box, Grid, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Student } from '@/types/IResponse';

interface RegisterFormProps {
  formMethods: UseFormReturn<Student>; // Use UseFormReturn type
}

const RegisterForm: React.FC<RegisterFormProps> = ({ formMethods }) => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = formMethods;

  React.useEffect(() => {
    // Set default value for dateOfBirth to today's date
    const today = new Date().toISOString().split('T')[0];
    setValue('dateOfBirth', today);
  }, [setValue]);

  const fields = [
    { label: 'รหัสนักศึกษา', name: 'studentId' },
    { label: 'ชื่อ (กรุณาใส่ชื่อเป็นภาษาอังกฤษและไม่ต้องใส่นามสกุล)', name: 'firstName' },
    { label: 'ชื่อ (ภาษาไทย) ', name: 'Name' },
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

  const onSubmit = (data: Student) => {
    // Handle form submission
    console.log('Form Data:', data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, mx: 'auto', my: 4 }}
    >
      <Typography color="secondary" align="center" sx={{ mt: 2 }}>
        ข้อมูลของท่านยังไม่มีในระบบ
      </Typography>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} md={6} key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              {...register(field.name as keyof Student)} // Apply register
              variant="outlined"
              type={field.type || 'text'}
              error={!!errors[field.name as keyof Student]} // Show error state if applicable
              helperText={errors[field.name as keyof Student]?.message} // Display error message
              required={['studentId', 'firstName', 'lastName', 'email'].includes(field.name)}
              InputProps={{
                // Add InputProps conditionally for specific fields
                ...(field.name === 'studentId' || field.name === 'firstName' ? {
                  readOnly: true, // Makes the input field read-only
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                } : {}),
              }}
              InputLabelProps={{
                shrink: true, // Ensures that the label is always visible
              }}
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
