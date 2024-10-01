"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller, UseFormReturn } from 'react-hook-form';
import { TextField, Button, Typography, Box, Grid, InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, FormHelperText, Radio, MenuItem } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { FormValues } from '@/types/IResponse';
import { watch } from 'fs';
import CustomFileUpload from '@/components/CustomFileUpload';
import { submitVolunteerForm } from '@/app/api/Volunteer';
import { useVolunteerFilesApi } from '@/hooks/Volunteer';


interface VolunteerFormProps {
  formValunteer: UseFormReturn<FormValues>;
}


const VolunteerForm: React.FC<VolunteerFormProps> = ({ formValunteer }) => {
  const { control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = formValunteer;


  const uploadPictureHouse = watch("uploadVolunteer");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const { loading, error, response, uploadVolunteerFiles } = useVolunteerFilesApi();


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
    setValue("uploadVolunteer", updatedFiles, { shouldValidate: true });
  };

  const handleFileRemove = (fileToRemove: File) => {
    const updatedFiles = files.filter(file => file !== fileToRemove);
    setFiles(updatedFiles);
    setValue("uploadVolunteer", updatedFiles, { shouldValidate: true });
  };

  const onSubmit = useCallback(async (data: FormValues) => {
    console.log("ข้อมูลที่ส่งในฟอร์ม: ", data);
    
    if (!data.uploadVolunteer || data.uploadVolunteer.length === 0) {
      setFileError("โปรดตรวจสอบให้แน่ใจว่าได้อัปโหลดไฟล์ที่จำเป็นทั้งหมดแล้ว");
      return;
    }

    const { studentId, firstName } = data;
    if (!studentId || !firstName) {
      setFileError("ไม่พบข้อมูลรหัสนักศึกษาหรือชื่อเต็ม");
      return;
    }

    const imageType: "Volunteer" = "Volunteer"; 

    const sendResult = await submitVolunteerForm(data);
    if (!sendResult) {
      setFileError("การส่งข้อมูลจิตอาสาล้มเหลว");
      return;
    }

    await uploadVolunteerFiles(files, studentId, firstName, imageType);
  }, [submitVolunteerForm, uploadVolunteerFiles]);


  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, mx: 'auto', my: 4 }}
    >
      <Typography color="secondary" align="center" sx={{ mt: 2 }}>
        ส่งข้อมูลกิจกรรมจิตอาสา
      </Typography>
      <Grid container spacing={2}>

        {/* ฟิลด์รหัสนักศึกษา */}
        <Grid item xs={12} md={6}>
          <Controller
            name="studentId"
            control={control}
            defaultValue=""
            rules={{ required: 'รหัสนักศึกษาจำเป็นต้องกรอก' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="รหัสนักศึกษา"
                {...field}
                variant="outlined"
                error={!!errors.studentId}
                helperText={errors.studentId?.message}

              />
            )}
          />
        </Grid>

        {/* ฟิลด์คำนำหน้า */}
        <Grid item xs={12} md={6}>
          <Controller
            name="prefix"
            control={control}
            defaultValue=""
            rules={{ required: 'โปรดเลือกคำนำหน้า' }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="คำนำหน้า"
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

        {/* ฟิลด์ชื่อเต็ม */}
        <Grid item xs={12} md={6}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: 'จำเป็นต้องกรอกชื่อเต็ม' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="ชื่อเต็ม"
                {...field}
                variant="outlined"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>

        {/* ฟิลด์ชื่อเล่น */}
        <Grid item xs={12} md={6}>
          <Controller
            name="nickname"
            control={control}
            defaultValue=""
            rules={{ required: 'จำเป็นต้องกรอกชื่อเล่น' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="ชื่อ - นามสกุล"
                {...field}
                variant="outlined"
                error={!!errors.nickname}
                helperText={errors.nickname?.message}
              />
            )}
          />
        </Grid>

        {/* ฟิลด์ชั้นปีที่จบ */}
        <Grid item xs={12} md={6}>
          <Controller
            name="graduate"
            control={control}
            defaultValue=""
            rules={{ required: 'โปรดเลือกชั้นปีที่จบ' }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="ชั้นปี"
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

        {/* ฟิลด์สาขา */}
        <Grid item xs={12} md={6}>
          <Controller
            name="branch"
            control={control}
            defaultValue=""
            rules={{ required: 'โปรดเลือกสาขา' }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="สาขา"
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
                {/* เพิ่มสาขาตามต้องการ */}
              </TextField>
            )}
          />
        </Grid>

        {/* ฟิลด์ชื่อกิจกรรม */}
        <Grid item xs={12} md={6}>
          <Controller
            name="activityName"
            control={control}
            defaultValue=""
            rules={{ required: 'จำเป็นต้องกรอกชื่อกิจกรรม' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="ชื่อกิจกรรม"
                {...field}
                variant="outlined"
                error={!!errors.activityName}
                helperText={errors.activityName?.message}
              />
            )}
          />
        </Grid>

        {/* ฟิลด์ชื่อองค์กร */}
        <Grid item xs={12} md={6}>
          <Controller
            name="organizationName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="ชื่อองค์กร"
                {...field}
                variant="outlined"
              />
            )}
          />
        </Grid>

        {/* ฟิลด์เบอร์โทรศัพท์องค์กร */}
        <Grid item xs={12} md={6}>
          <Controller
            name="organizationPhone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="เบอร์โทรศัพท์องค์กร"
                {...field}
                variant="outlined"
                error={!!errors.organizationPhone}
                helperText={errors.organizationPhone?.message}
              />
            )}
          />
        </Grid>

        {/* ฟิลด์วันที่ทำกิจกรรม */}
        <Grid item xs={12} md={6}>
          <Controller
            name="activityDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="วันที่ทำกิจกรรม"
                type="date"
                {...field}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            )}
          />
        </Grid>

        {/* ฟิลด์จำนวนชั่วโมง */}
        <Grid item xs={12} md={6}>
          <Controller
            name="hours"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                fullWidth
                label="จำนวนชั่วโมง"
                type="number"
                {...field}
                variant="outlined"
              />
            )}
          />
        </Grid>

        {/* ฟิลด์รายละเอียดกิจกรรม */}
        <Grid item xs={12}>
          <Controller
            name="activityDescription"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="รายละเอียดกิจกรรม"
                {...field}
                variant="outlined"
                multiline
                rows={4}
              />
            )}
          />
        </Grid>

        {/* ฟิลด์อัปโหลดรูปภาพกิจกรรม */}
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

      {/* ปุ่มส่งข้อมูล */}
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

export default VolunteerForm;
