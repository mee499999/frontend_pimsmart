"use client";
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { TextField, Box, Button, Grid, Typography } from '@mui/material';
import { Register } from '@/app/api/Register'; // Ensure this path is correct
import { Student } from '@/types/IResponse';
import RegisterForm from './components/RegisterForm';
import Secondaryword from './components/Secondaryword';
import Checkstatus from './components/Checkstatus';
import TabCards from '@/components/TabCards';
import Addresses from './components/addresses';
import { useForm, UseFormReturn } from 'react-hook-form';
import Scholarships from './components/Scholarships';
import Studentpersonalinformation from '../Volunteer/components/Studentpersonalinformation';
import StepFive from './components/StepFive';



const Page: React.FC = () => {
  const formMethods = useForm<Student>(); // Initialize useForm
  const { handleSubmit, register, formState: { errors } } = formMethods;
  const [studentDetails, setStudentDetails] = useState<Student[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedForm, setSelectedForm] = useState<string>('Register'); // Default is "Register"
  const [error, setError] = useState<string | null>(null);

  const handleSidebarClick = (formName: string) => {
    setSelectedForm(formName);
  };


  const onSubmit = async (data: Student) => {
    setFormSubmitted(true);

    // Ensure that studentId and firstName are defined before using them
    if (!data.studentId || !data.firstName) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      setIsLoading(true);
      const result = await Register(data.studentId, data.firstName); // Call Register with required arguments

      if (result) {
        setStudentDetails(result); // Set studentDetails with the result directly
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
    <Layout
      contentTitle="ใบสมัครขอรับทุน PIM SMART"
      sidebarItems={[
        {
          text: 'สมัคร',
          hook: () => handleSidebarClick('Register') // Show form on clicking "สมัคร"
        },
        {
          text: 'ตรวจสอบสถานะ',
          hook: () => handleSidebarClick('Checkstatus') // Hide all forms on clicking "ตรวจสอบสถานะ"
        }
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 4,
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: 2,
            paddingTop: 3,
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          {/* Show Checkstatus component only if selected */}
          {selectedForm === 'Checkstatus' && <Checkstatus />}

          {/* Conditionally render the form and other components only if "Register" is selected */}
          {selectedForm === 'Register' && (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  {/* First Section */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="รหัสนักศึกษา"
                      {...register('studentId', { required: 'Required' })}
                      variant="outlined"
                      error={!!errors.studentId}
                      helperText={errors.studentId?.message}
                    />
                  </Grid>

                  {/* Second Section */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="ชื่อ (กรุณาใส่ชื่อเป็นภาษาอังกฤษและไม่ต้องใส่นามสกุล)"
                      {...register('firstName', {
                        required: 'Required',
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: 'Only English letters are allowed'
                        }
                      })}
                      variant="outlined"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
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
                      disabled={isLoading} // Disable button while loading
                    >
                      ส่งข้อมูล
                    </Button>
                  </Grid>
                </Grid>
              </form>

              {/* Conditional Rendering */}
              {formSubmitted && !error && studentDetails ? (
                <Secondaryword student={studentDetails[0]} /> // Assuming studentDetails is an array
              ) : (
                formSubmitted && !error && studentDetails === null && (
                  <TabCards
                    tabs={[
                      { label: 'Step 1', component: <RegisterForm formMethods={formMethods} /> },
                      { label: 'Step 2', component: <Addresses formMethods={formMethods} /> },
                      { label: 'Step 3', component: <Scholarships formMethods={formMethods} /> },
                      { label: 'Step 4', component: <Studentpersonalinformation formMethods={formMethods} /> },
                      { label: 'Step 5', component: <StepFive formMethods={formMethods} /> },
                    ]}
                  />
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
