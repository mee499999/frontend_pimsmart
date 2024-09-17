import { Student, Location } from "@/types/IResponse";
import { Box, Grid, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import locationData from '@/components/ThaiPostcode/thailand-province-district-subdistrict-zipcode.json';


// Define the structure of the location data


interface RegisterFormProps {
    formMethods: UseFormReturn<Student>;
}

const Studentpersonalinformation: React.FC<RegisterFormProps> = ({ formMethods }) => {
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
                        label="Line ID"
                        {...register("lineID")}
                        fullWidth
                        error={!!errors.lineID}
                        helperText={errors.lineID ? "This field is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Facebook"
                        {...register("facebook")}
                        fullWidth
                        error={!!errors.facebook}
                        helperText={errors.facebook ? "This field is required" : ""}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="บิดา ชื่อ - นามสกุล"
                        {...register("fatherNameSurname")}
                        fullWidth
                        error={!!errors.fatherNameSurname}
                        helperText={errors.fatherNameSurname ? "This field is required" : ""}
                    />
                </Grid>

                {/* Other Scholarships Field */}
                <Grid item xs={12} md={6}>
                    <TextField
                        label="มารดา ชื่อ - นามสกุล"
                        {...register("motherNameSurname")}
                        fullWidth
                        error={!!errors.motherNameSurname}
                        helperText={errors.motherNameSurname ? "This field is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="อาชีพ(บิดา)"
                        {...register("occupationFather")}
                        fullWidth
                        error={!!errors.occupationFather}
                        helperText={errors.occupationFather ? "This field is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="อาชีพ(มารดา)"
                        {...register("occupationMother")}
                        fullWidth
                        error={!!errors.occupationMother}
                        helperText={errors.occupationMother ? "This field is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="ประมาณรายได้ของบิดาต่อเดือน"
                        {...register("estimateFatherMonthlyIncome")}
                        fullWidth
                        error={!!errors.estimateFatherMonthlyIncome}
                        helperText={errors.estimateFatherMonthlyIncome ? "This field is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="ประมาณรายได้ของมารดาต่อเดือน"
                        {...register("motherApproximateMonthlyIncome")}
                        fullWidth
                        error={!!errors.motherApproximateMonthlyIncome}
                        helperText={errors.motherApproximateMonthlyIncome ? "This field is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>ที่อยู่บิดา</InputLabel>
                        <Controller
                            name="fatherAddress"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    label="ที่อยู่บิดา"
                                    {...field}
                                    error={!!errors.fatherAddress}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(e);
                                        if (value !== 'ที่อยู่อื่น') {
                                            setValue('fatherAddressDetails', '');  // Clear the fatherAddressDetails field
                                        }
                                    }}
                                >
                                    <MenuItem value="ที่อยุ่เดียวกับนักศึกษา">ที่อยุ่เดียวกับนักศึกษา</MenuItem>
                                    <MenuItem value="ที่อยู่อื่น">ที่อยู่อื่น</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </Grid>

                {watch('fatherAddress') === 'ที่อยู่อื่น' && (
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="fatherAddressDetails"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="ที่อยู่อื่นโปรดระบุ"
                                    {...field}
                                    variant="outlined"
                                    error={!!errors.fatherAddressDetails}
                                    helperText={errors.fatherAddressDetails?.message}
                                />
                            )}
                        />
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>ที่อยู่มารดา</InputLabel>
                        <Controller
                            name="motherAddress"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    label="ที่อยู่มารดา"
                                    {...field}
                                    error={!!errors.motherAddress}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(e);
                                        if (value !== 'ที่อยู่อื่น') {
                                            setValue('motherAddressDetails', '');  // Clear the fatherAddressDetails field
                                        }
                                    }}
                                >
                                    <MenuItem value="ที่อยุ่เดียวกับนักศึกษา">ที่อยุ่เดียวกับนักศึกษา</MenuItem>
                                    <MenuItem value="ที่อยู่อื่น">ที่อยู่อื่น</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </Grid>

                {watch('motherAddress') === 'ที่อยู่อื่น' && (
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="motherAddressDetails"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="ที่อยู่อื่นโปรดระบุ"
                                    {...field}
                                    variant="outlined"
                                    error={!!errors.motherAddressDetails}
                                    helperText={errors.motherAddressDetails?.message}
                                />
                            )}
                        />
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <TextField
                        label="โรคประจำตัว (ถ้ามี)"
                        {...register("congenitalDisease")}
                        fullWidth
                        error={!!errors.congenitalDisease}
                        helperText={errors.congenitalDisease ? "This field is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="โรคจำตัวบิดา (ถ้ามี)"
                        {...register("paternalMemoryDisorder")}
                        fullWidth
                        error={!!errors.paternalMemoryDisorder}
                        helperText={errors.paternalMemoryDisorder ? "This field is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="โรคจำตัวมารดา (ถ้ามี)"
                        {...register("maternalMemoryDisorder")}
                        fullWidth
                        error={!!errors.maternalMemoryDisorder}
                        helperText={errors.maternalMemoryDisorder ? "This field is required" : ""}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>สถานภาพบิดา</InputLabel>
                        <Controller
                            name="fatherStatus"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    label="สถานภาพบิดา"
                                    {...field}
                                    error={!!errors.fatherStatus}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(e);
                                        if (value !== 'เสียชีวิต') {
                                            setValue('fatherStatusDetails', '');
                                        }
                                    }}
                                >
                                    <MenuItem value="มีชีวิตอยู่">มีชีวิตอยู่</MenuItem>
                                    <MenuItem value="เสียชีวิต">เสียชีวิต</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </Grid>

                {watch('fatherStatus') === 'เสียชีวิต' && (
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="fatherStatusDetails"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="โปรดระบุวันเดือนปี"
                                    type="date"
                                    {...field}
                                    InputLabelProps={{
                                        shrink: true, // Ensures the label stays above the input when a date is selected
                                    }}
                                    variant="outlined"
                                    error={!!errors.fatherStatusDetails}
                                    helperText={errors.fatherStatusDetails?.message}
                                />
                            )}
                        />
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>สถานภาพมารดา</InputLabel>
                        <Controller
                            name="maternalStatus"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    label="สถานภาพมารดา"
                                    {...field}
                                    error={!!errors.maternalStatus}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(e);
                                        if (value !== 'เสียชีวิต') {
                                            setValue('maternalStatusDetails', '');
                                        }
                                    }}
                                >
                                    <MenuItem value="มีชีวิตอยู่">มีชีวิตอยู่</MenuItem>
                                    <MenuItem value="เสียชีวิต">เสียชีวิต</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </Grid>

                {watch('maternalStatus') === 'เสียชีวิต' && (
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="maternalStatusDetails"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="โปรดระบุวันเดือนปี"
                                    type="date"
                                    {...field}
                                    InputLabelProps={{
                                        shrink: true, // Ensures the label stays above the input when a date is selected
                                    }}
                                    variant="outlined"
                                    error={!!errors.maternalStatusDetails}
                                    helperText={errors.maternalStatusDetails?.message}
                                />
                            )}
                        />
                    </Grid>
                )}




            </Grid>

            <Button type="submit" variant="contained" color="primary">
                Update
            </Button>
        </Box>
    );
};

export default Studentpersonalinformation;
