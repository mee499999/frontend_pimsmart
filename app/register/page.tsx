"use client";
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { TextField, Box, Button, Grid, Typography } from '@mui/material';
import { Register } from '@/app/api/Register'; // Ensure this path is correct
import { Student } from '@/types/IResponse';
import RegisterForm from './components/RegisterForm';
import Secondaryword from './components/Secondaryword';
import Checkstatus from './components/Checkstatus';

const Page: React.FC = () => {
  const [formData, setFormData] = useState<{ studentId: string; firstName: string }>({
    studentId: '',
    firstName: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [studentDetails, setStudentDetails] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedForm, setSelectedForm] = useState<string>('Register'); // Default is "Register"

  const handleSidebarClick = (formName: string) => {
    setSelectedForm(formName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Basic validation
    if (!formData.studentId || !formData.firstName) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      setIsLoading(true);
      const result = await Register(formData.studentId, formData.firstName);

      if (result.data) {
        setStudentDetails(result.data);
        setError(null);
      } else {
        setStudentDetails(null);
        setError(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout contentTitle="ใบสมัครขอรับทุน PIM SMART"
      sidebarItems={[
        {
          text: 'สมัคร',
          hook: () => handleSidebarClick('Register') // Show form on clicking "สมัคร"
        },
        {
          text: 'ตรวจสอบสถานะ',
          hook: () => handleSidebarClick('Checkstatus') // Hide all forms on clicking "ตรวจสอบสถานะ"
        }
      ]}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 4,
          width:'100%'
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: 2,
            paddingTop: 3,
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1
          }}
        >
          {/* Show Checkstatus component only if selected */}
          {selectedForm === 'Checkstatus' && <Checkstatus />}

          {/* Conditionally render the form and other components only if "Register" is selected */}
          {selectedForm === 'Register' && (
            <>
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
                      name="firstName"
                      value={formData.firstName}
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
              {formSubmitted && !error && studentDetails ? (
                <Secondaryword student={studentDetails} />
              ) : (
                formSubmitted && !error && studentDetails === null && (
                  <RegisterForm student={formData} />
                )
              )}
            </>
          )}
        </Box>
      </Box>

      <main>
        <h1>jguihuithioj</h1>
      </main>
    </Layout>
  );
};

export default Page;
