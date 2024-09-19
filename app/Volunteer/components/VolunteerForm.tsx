"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Box, Grid, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { FormValues } from '@/types/IResponse';

interface VolunteerFormProps {
  onSubmit: (data: FormValues) => void;
}

const VolunteerForm: React.FC<VolunteerFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, mx: 'auto', my: 4 }}
    >
      <Typography color="secondary" align="center" sx={{ mt: 2 }}>
        Submit Volunteer Activity
      </Typography>

      <Grid container spacing={2}>
        {/* Student ID Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="student_id"
            control={control}
            defaultValue=""
            rules={{ required: 'Student ID is required' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Student ID"
                {...field}
                variant="outlined"
                error={!!errors.student_id}
                helperText={errors.student_id?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Full Name Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="full_name"
            control={control}
            defaultValue=""
            rules={{ required: 'Full Name is required' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Full Name"
                {...field}
                variant="outlined"
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
              />
            )}
          />
        </Grid>

        {/* Activity Name Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="activity_name"
            control={control}
            defaultValue=""
            rules={{ required: 'Activity Name is required' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Activity Name"
                {...field}
                variant="outlined"
                error={!!errors.activity_name}
                helperText={errors.activity_name?.message}
              />
            )}
          />
        </Grid>

        {/* Organization Name Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="organization_name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Organization Name"
                {...field}
                variant="outlined"
              />
            )}
          />
        </Grid>

        {/* Organization Phone Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="organization_phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Organization Phone"
                {...field}
                variant="outlined"
                error={!!errors.organization_phone}
                helperText={errors.organization_phone?.message}
              />
            )}
          />
        </Grid>

        {/* Activity Description Field */}
        <Grid item xs={12}>
          <Controller
            name="activity_description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Activity Description"
                {...field}
                variant="outlined"
                multiline
                rows={4}
              />
            )}
          />
        </Grid>

        {/* Activity Date Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="activity_date"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Activity Date"
                type="date"
                {...field}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            )}
          />
        </Grid>

        {/* Hours Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="hours"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Number of Hours"
                type="number"
                {...field}
                variant="outlined"
              />
            )}
          />
        </Grid>

        {/* Activity Image Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="activity_image"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Upload Activity Image"
                type="file"
                inputProps={{
                  accept: "image/*",
                }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />
            )}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolunteerForm;
