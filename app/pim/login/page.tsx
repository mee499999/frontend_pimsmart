"use client";

import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import useLogin from '@/hooks/Admin/useLogin';
import Layout from '@/components/Layout';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
  const { formData, loading, error, handleChange, loginUser } = useLogin();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await loginUser();

    // Redirect to /Admin page on successful login
    if (response?.success) {
      router.push('/pim/Admin');
    }
  };

  return (
    <Layout contentTitle="Login Page">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '90%', sm: '300px' }, margin: '0 auto' }} // Responsive width
      >
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading || !!error}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {error && (
          <Typography color="error" aria-live="polite">
            {error}
          </Typography>
        )}
      </Box>
    </Layout>
  );
};

export default Page;
