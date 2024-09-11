"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { TextField, Box, Button, Grid, Typography } from '@mui/material';
import { Register } from '@/app/api/Register'; // Ensure this path is correct
import { Student } from '@/types/IResponse';
import RegisterForm from './components/RegisterForm';
import Secondaryword from './components/Secondaryword';

const Page: React.FC = () => {
  const [formData, setFormData] = useState<{ studentId: string; fullName: string }>({
    studentId: '',
    fullName: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [studentDetails, setStudentDetails] = useState<Student | null>(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // New state to track form submission

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.studentId || !formData.fullName) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      setIsLoading(true);
      // Call the register function to fetch student data
      const result = await Register(formData.studentId, formData.fullName);

      // Assuming the result contains the student data directly
      if (result.data) {
        setStudentDetails(result.data); // Set student details if found
        setError(null); // Clear previous errors
      } else {
        setStudentDetails(null); // Clear student details if not found
        setError('ไม่พบข้อมูลนักศึกษา'); // Handle case where student data is not found
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
    } finally {
      setIsLoading(false);
      setFormSubmitted(true); // Mark form as submitted
    }
  };

  return (
    <Layout contentTitle="ใบสมัครขอรับทุน PIM SMART">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 4,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            padding: 2,
            paddingTop: 3,
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* First Section */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="รหัสนักศึกษา"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              {/* Second Section */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ชื่อ-นามสกุล"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              {/* Error Message */}
              {error && (
                <Grid item xs={12}>
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                </Grid>
              )}

              {/* Submit Button */}
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  ส่งข้อมูล
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Conditional Rendering */}
          {formSubmitted && studentDetails ? (
            <RegisterForm />
          ) : (
            formSubmitted && studentDetails === null && (
              <Secondaryword />
            )
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Page;
