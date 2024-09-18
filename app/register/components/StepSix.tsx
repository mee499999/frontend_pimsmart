import { Student, Location } from "@/types/IResponse";
import { Box, Grid, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import locationData from '@/components/ThaiPostcode/thailand-province-district-subdistrict-zipcode.json';


// Define the structure of the location data


interface RegisterFormProps {
    formMethods: UseFormReturn<Student>;
}

const StepSix: React.FC<RegisterFormProps> = ({ formMethods }) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = formMethods;




    const onSubmit = (data: Student) => {
        console.log("Form Data: ", data);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 800,
                mx: "auto",
                my: 4,
            }}
        >
            <Typography color="secondary" align="center" sx={{ mt: 2 }}>
                ข้อมูลการติดต่อกลับ
            </Typography>
            <Grid container spacing={2}>



                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="ข้อมูลการติดต่อกลับ"
                        {...register("contactInformation")}
                        error={!!errors.contactInformation}
                        helperText={errors.contactInformation?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="ชื่อ - นามสกุล ผู้ที่สามารถติดต่อได้ในกรณีฉุกเฉิน"
                        {...register("emergencyContact")}
                        error={!!errors.emergencyContact}
                        helperText={errors.emergencyContact?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="ความสัมพันธ์"
                        multiline
                        {...register("relationship")}
                        error={!!errors.relationship}
                        helperText={errors.relationship?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="เบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน ที่สามารถติดต่อได้"
                        multiline
                        {...register("emergencyContactPhoneNumber")}
                        error={!!errors.emergencyContactPhoneNumber}
                        helperText={errors.emergencyContactPhoneNumber?.message}
                    />
                </Grid>
            </Grid>







            <Button type="submit" variant="contained" color="primary">
                Update
            </Button>
        </Box>
    );
};

export default StepSix;
