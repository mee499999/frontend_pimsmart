"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { TextField, Box, Button, Grid } from '@mui/material';

const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <Layout contentTitle="ใบสมัครขอรับทุน PIM SMART">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 4, // ปรับระยะห่างจากด้านบนตามต้องการ
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 600, // กำหนดขนาดสูงสุดของฟอร์ม 
            padding:  2,
            paddingTop: 3,
            backgroundColor: 'background.paper', // หรือสีพื้นหลังที่ต้องการ
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
        </Box>
      </Box>
    </Layout>
  );
};

export default Page;
