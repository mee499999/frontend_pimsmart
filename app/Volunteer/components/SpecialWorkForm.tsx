"use client";

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Box, Grid, MenuItem, FormHelperText } from '@mui/material';
import { FormValuesWork } from '@/types/IResponse';
import CustomFileUpload from '@/components/CustomFileUpload';

interface WorkFormProps {
  onSubmit: (data: FormValuesWork) => void;
}

const SpecialWorkForm: React.FC<WorkFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValuesWork>();

  const uploadPictureHouse = watch("uploadSpecialwork");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (uploadPictureHouse instanceof FileList) {
      setFiles(Array.from(uploadPictureHouse));
    } else if (Array.isArray(uploadPictureHouse)) {
      setFiles(uploadPictureHouse);
    }
  }, [uploadPictureHouse]);

  const handleFileChange = (newFiles: File[]) => {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    setValue("uploadSpecialwork", updatedFiles, { shouldValidate: true });
  };

  const handleFileRemove = (fileToRemove: File) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    setValue("uploadSpecialwork", updatedFiles, { shouldValidate: true });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)} // Form submission handled here
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, mx: 'auto', my: 4 }}
    >
      <Typography color="secondary" align="center" sx={{ mt: 2 }}>
        Submit Special Work Activity
      </Typography>

      <Grid container spacing={2}>
        {/* Student ID Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="studentId"
            control={control}
            defaultValue=""
            rules={{ required: 'Student ID is required' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Student ID"
                {...field}
                variant="outlined"
                error={!!errors.studentId}
                helperText={errors.studentId?.message}
              />
            )}
          />
        </Grid>

        {/* Prefix (Mr./Ms.) Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="prefix"
            control={control}
            defaultValue=""
            rules={{ required: 'Please select your prefix' }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Prefix"
                {...field}
                variant="outlined"
                error={!!errors.prefix}
                helperText={errors.prefix?.message}
              >
                <MenuItem value="male">ชาย</MenuItem>
                <MenuItem value="female">หญิง</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        {/* Full Name Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: 'Full Name is required' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Full Name"
                {...field}
                variant="outlined"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>

        {/* Nickname Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="nickname"
            control={control}
            defaultValue=""
            rules={{ required: 'Nickname is required' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Nickname"
                {...field}
                variant="outlined"
                error={!!errors.nickname}
                helperText={errors.nickname?.message}
              />
            )}
          />
        </Grid>

        {/* Graduation Year */}
        <Grid item xs={12} md={6}>
          <Controller
            name="graduate"
            control={control}
            defaultValue=""
            rules={{ required: 'Please select your graduation year' }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Graduation Year"
                {...field}
                variant="outlined"
                error={!!errors.graduate}
                helperText={errors.graduate?.message}
              >
                <MenuItem value="ชั้นปีที่ 1">ชั้นปีที่ 1</MenuItem>
                <MenuItem value="ชั้นปีที่ 2">ชั้นปีที่ 2</MenuItem>
                <MenuItem value="ชั้นปีที่ 3">ชั้นปีที่ 3</MenuItem>
                <MenuItem value="ชั้นปีที่ 4">ชั้นปีที่ 4</MenuItem>
                <MenuItem value="ชั้นปีที่ 5">ชั้นปีที่ 5</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        {/* Branch Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="branch"
            control={control}
            defaultValue=""
            rules={{ required: 'Please select your branch' }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Branch"
                {...field}
                variant="outlined"
                error={!!errors.branch}
                helperText={errors.branch?.message}
              >
                <MenuItem value="MTM">MTM</MenuItem>
                <MenuItem value="IMTM">IMTM</MenuItem>
                {/* Add more options as needed */}
              </TextField>
            )}
          />
        </Grid>

        {/* Activity Name Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="workName"
            control={control}
            defaultValue=""
            rules={{ required: 'Activity Name is required' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Activity Name"
                {...field}
                variant="outlined"
                error={!!errors.workName}
                helperText={errors.workName?.message}
              />
            )}
          />
        </Grid>

        {/* Organization Name Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="organizationName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth 
                label="Organization Name"
                {...field}
                variant="outlined"
                error={!!errors.organizationName}
                helperText={errors.organizationName?.message}
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
            name="workDescription"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Activity Description"
                {...field}
                variant="outlined"
                error={!!errors.workDescription}
                helperText={errors.workDescription?.message}
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

        {/* Work Type Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="workType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Work Type"
                {...field}
                variant="outlined"
              >
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                <MenuItem value="Part-Time">Part-Time</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                {/* Add more options as needed */}
              </TextField>
            )}
          />
        </Grid>

        {/* Compensation Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="compensation"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Compensation"
                type="number"
                {...field}
                variant="outlined"
              />
            )}
          />
        </Grid>

        {/* Work Dates Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="workDates"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Work Dates"
                {...field}
                variant="outlined"
                error={!!errors.workDates}
                helperText={errors.workDates?.message}
              />
            )}
          />
        </Grid>

        {/* Work Time Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="workTime"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Work Time"
                {...field}
                variant="outlined"
                error={!!errors.workTime}
                helperText={errors.workTime?.message}
              />
            )}
          />
        </Grid>

        {/* Activity Image Field */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Upload at least 2 images (Outside and inside views)
            </Typography>
            <CustomFileUpload
              value={files}
              multiple
              onChange={handleFileChange}
              onRemove={handleFileRemove}
              accept="image/*"
            />
            {fileError && (
              <FormHelperText error>{fileError}</FormHelperText>
            )}
          </Grid>
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

export default SpecialWorkForm;
