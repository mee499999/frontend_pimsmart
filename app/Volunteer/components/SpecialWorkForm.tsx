//submitSpecialWorkForm.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Box, Grid, InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, FormHelperText, Radio, MenuItem } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { FormValues } from '@/types/IResponse';
import CustomFileUpload from './CustomFileUpload';
import { watch } from 'fs';


interface WorlFormProps {
  onSubmit: (data: FormValues) => void;
}

const VolunteerForm: React.FC<WorlFormProps> = ({ onSubmit }) => {
  const { control,
         handleSubmit, 
         formState: { errors },
         setValue,
         watch,
        } = useForm<FormValues>();
  const uploadPictureHouse = watch("uploadVolunteer");
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
        setValue("uploadVolunteer", updatedFiles, { shouldValidate: true });
    };

    const handleFileRemove = (fileToRemove: File) => {
        const updatedFiles = files.filter(file => file !== fileToRemove);
        setFiles(updatedFiles);
        setValue("uploadVolunteer", updatedFiles, { shouldValidate: true });
    };

  

  
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

                    </InputAdornment>
                  ),
                }}
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

        <Grid item xs={12} md={6}>
          <Controller
            name="nickname"
            control={control}
            defaultValue=""
            rules={{ required: 'Full Name is required' }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="nickname"
                {...field}
                variant="outlined"
                error={!!errors.nickname}
                helperText={errors.nickname?.message}
              />
            )}
          />
        </Grid>





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

        {/* Graduation Year Field */}
        <Grid item xs={12} md={6}>
          <Controller
            name="branch"
            control={control}
            defaultValue=""
            rules={{ required: 'Please select your field of study' }}
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
                {/* Add each MenuItem from the image list */}
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
        <Grid container spacing={2}>
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
