"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { TextField, Grid, Button, Box } from '@mui/material';

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
    // Handle form submission logic here, such as sending data to an API
    console.log('Form data submitted:', formData);
  };

  return (
    <Layout contentTitle="ใบสมัครขอรับทุน PIM SMART">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="รหัสนักศึกษา"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ชื่อ-นามสกุล"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              ส่งข้อมูล
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default Page;
