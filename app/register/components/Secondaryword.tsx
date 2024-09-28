import React from 'react';
import { TextField, Button, Typography, Box, InputAdornment, Grid } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import LockIcon from '@mui/icons-material/Lock';
import { Student } from "@/types/Register";
import { sendRequestDataApi } from '@/app/api/Register';

interface RegisterFormProps {
  formMethods: UseFormReturn<Student>;
}

const Secondaryword: React.FC<RegisterFormProps> = ({ formMethods }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;


  const onSubmit = async (data: Student) => {
    // Destructure only the required fields
    const { studentId, firstName, specialRequest } = data;
    
    // Log or submit only the necessary data
    console.log("Form Data Submitted: ", { studentId, firstName, specialRequest });
  
    try {
      // Send the data to the API
      await sendRequestDataApi(data );
      
      // Handle success (optional)
      console.log("Data successfully sent to API.");
    } catch (error) {
      // Handle any errors (optional)
      console.error("Error sending data to API:", error);
    }
  };
  
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', my: 4 }}
    >
      <Typography color="secondary" align="center" sx={{ mt: 2 }}>
        ข้อมูลของท่านมีอยู่ในระบบแล้ว
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="studentId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="รหัสนักศึกษา"
                {...field}
                variant="outlined"
                error={!!errors.studentId}
                helperText={errors.studentId?.message}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="ชื่อ (กรุณาใส่ชื่อเป็นภาษาอังกฤษ)"
                {...field}
                variant="outlined"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="สงคำรอง"
            multiline
            rows={4}
            {...register("specialRequest")}
            error={!!errors.specialRequest}
            helperText={errors.specialRequest?.message}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        ส่งข้อมูล
      </Button>
    </Box>
  );
};

export default Secondaryword;
