import { Student } from "@/types/Register";
import { Box, Grid, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import locationData from '@/components/ThaiPostcode/thailand-province-district-subdistrict-zipcode.json';


// Define the structure of the location data


interface RegisterFormProps {
    formMethods: UseFormReturn<Student>;
}

const StepFive: React.FC<RegisterFormProps> = ({ formMethods }) => {
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
                ข้อมูลของท่านยังไม่มีในระบบ
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="ระบุค่าที่อยู่ต่อเดือนรวมน้ำไฟ ( เช่าบ้าน/หอ )"
                        {...register("addressValue")}
                        fullWidth
                        error={!!errors.addressValue}
                        helperText={errors.addressValue ? "This field is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="ค่าเดินทางไป - กลับต่อวัน"
                        {...register("roundTripTravel")}
                        fullWidth
                        error={!!errors.roundTripTravel}
                        helperText={errors.roundTripTravel ? "This field is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="ค่าใช้จ่ายภายในบ้าน"
                        {...register("householdExpenses")}
                        fullWidth
                        error={!!errors.householdExpenses}
                        helperText={errors.householdExpenses ? "This field is required" : ""}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="หนี้สินครอบครัว"
                        {...register("familyDebt")}
                        fullWidth
                        error={!!errors.familyDebt}
                        helperText={errors.familyDebt ? "This field is required" : ""}
                    />
                </Grid>





            </Grid>

            {/* <Button type="submit" variant="contained" color="primary">
                Update
            </Button> */}
        </Box>
    );
};

export default StepFive;
