import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, TextareaAutosize, InputAdornment } from '@mui/material';
import { Student } from '@/types/IResponse';
import LockIcon from '@mui/icons-material/Lock';

interface RegisterFormProps {
  student: Student | null;
}

const Secondaryword: React.FC<RegisterFormProps> = ({ student }) => {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [editorValue, setEditorValue] = useState<string>('');

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
        ข้อมูลของท่านมีอยู่ในระบบแล้ว
      </Typography>

      <TextField
        fullWidth
        label="รหัสนักศึกษา"
        value={studentId} // Bind the value to state
        InputProps={{
          readOnly: true, // Makes the input field read-only
          endAdornment: (
            <InputAdornment position="end">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          shrink: true, // Ensures that the label is always visible
        }}
      />
      <TextField
        fullWidth
        label="ชื่อ-นามสกุล"
        value={firstName} // Bind the value to state
        InputProps={{
          readOnly: true, // Makes the input field read-only
          endAdornment: (
            <InputAdornment position="end">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          shrink: true, // Ensures that the label is always visible
        }}
      />

      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
        value={editorValue} // Bind value to state
        onChange={(e) => setEditorValue(e.target.value)} // Handle changes
        style={{ width: '100%' }} // Adjust width or other styles as needed
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

export default Secondaryword;
