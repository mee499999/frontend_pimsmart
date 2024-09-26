"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller, UseFormReturn } from 'react-hook-form';
import { TextField, Button, Typography, Box, Grid, MenuItem, FormHelperText } from '@mui/material';
import { FormValuesWork } from '@/types/IResponse';
import CustomFileUpload from '@/components/CustomFileUpload';
import { useuploadSpecialWorkApi } from '@/hooks/SpecialWork';
import { submitSpecialWorkForm } from '@/app/api/SpecialWork';


interface WorkFormProps {
  formwork: UseFormReturn<FormValuesWork>;
}



const SpecialWorkForm: React.FC<WorkFormProps> = ({ formwork }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = formwork;

  const uploadPictureHouse = watch("uploadSpecialwork");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const { loading, error, response, uploadSpecialWork } = useuploadSpecialWorkApi();



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

  const onSubmit = useCallback(async (data: FormValuesWork) => {
    console.log("Form Data Submitted: ", data);
    // Additional form submission logic here

    if (!data.uploadSpecialwork || data.uploadSpecialwork.length === 0) {
      setFileError("โปรดตรวจสอบให้แน่ใจว่าได้อัปโหลดไฟล์ที่จำเป็นทั้งหมดแล้ว");
      return;
    }

    const { studentId, firstName } = data;
    if (!studentId || !firstName) {
      setFileError("ไม่พบข้อมูล studentId หรือ firstName");
      return;
    }
    const imageType: "Specialwork" = "Specialwork"; 

    const sendResult = await submitSpecialWorkForm(data);
    if (!sendResult) {
      setFileError("การส่งข้อมูลจิตอาสาล้มเหลว");
      return;
    }

    await uploadSpecialWork(files, studentId, firstName, imageType);
  }, [submitSpecialWorkForm, uploadSpecialWork]);






  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
                <MenuItem value="FBM">FBM</MenuItem>
                <MenuItem value="RBM">RBM</MenuItem>
                <MenuItem value="LTM">LTM</MenuItem>
                <MenuItem value="BC">BC</MenuItem>
                <MenuItem value="BJ">BJ</MenuItem>
                <MenuItem value="CEB">CEB</MenuItem>
                <MenuItem value="CB">CB</MenuItem>
                <MenuItem value="CJ">CJ</MenuItem>
                <MenuItem value="DIT">DIT</MenuItem>
                <MenuItem value="CAI">CAI</MenuItem>
                <MenuItem value="IE">IE</MenuItem>
                <MenuItem value="AME">AME</MenuItem>
                <MenuItem value="RAE">RAE</MenuItem>
                <MenuItem value="IAM">IAM</MenuItem>
                <MenuItem value="AVI">AVI</MenuItem>
                <MenuItem value="HTM">HTM</MenuItem>
                <MenuItem value="RPM">RPM</MenuItem>
                <MenuItem value="HROM">HROM</MenuItem>
                <MenuItem value="FTM">FTM</MenuItem>
                <MenuItem value="PTM">PTM</MenuItem>
                <MenuItem value="TCL">TCL</MenuItem>
                <MenuItem value="ELT">ELT</MenuItem>
                <MenuItem value="NS">NS</MenuItem>
                <MenuItem value="NS">HIT</MenuItem>
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
            name="organizationPhone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Organization Phone"
                {...field}
                variant="outlined"
                error={!!errors.organizationPhone}
                helperText={errors.organizationPhone?.message}
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
            name="activityDate"
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
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            อัพโหลดอย่างน้อย 2 รูป ภาพรวมนอกบ้าน ภาพรวมในบ้าน
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SpecialWorkForm;
