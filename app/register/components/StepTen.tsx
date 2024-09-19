import { Student } from "@/types/IResponse";
import { Box, Grid, Typography, Button, FormHelperText, TextField } from "@mui/material";
import { UseFormReturn, Controller } from "react-hook-form";
import { useState } from "react";
import CustomFileUpload from "@/app/Volunteer/components/CustomFileUpload";

interface RegisterFormProps {
    formMethods: UseFormReturn<Student>;
}

const StepTen: React.FC<RegisterFormProps> = ({ formMethods }) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
        watch,
    } = formMethods;

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    
    const handleFileChange = (files: File[]) => {
        setSelectedFiles(files);
        setValue("uploadPictureHouse", files);
        clearErrors("uploadPictureHouse");
    };

    const validateFiles = () => {
        if (selectedFiles.length < 2) {
            setError("uploadPictureHouse", { type: "manual", message: "กรุณาอัพโหลดรูปอย่างน้อย 2 รูป" });
            return false;
        }
        return true;
    };

    const onSubmit = (data: Student) => {
        if (!validateFiles()) return;

        console.log("Form Data: ", data);
        if (selectedFiles.length > 0) {
            console.log("Selected Files: ", selectedFiles);
        }

        // Proceed with form submission logic
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
                เล่าประวัติครอบครัวคร่าวๆ และเหตุผลในการขอทุน มีความจำเป็น ความเดือนร้อน ความต้องการให้กองทุนฯช่วยเหลือ
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        อัพโหลดอย่างน้อย 2 รูป ภาพรวมนอกบ้าน ภาพรวมในบ้าน
                    </Typography>
                    <CustomFileUpload
                    
                        value={selectedFiles}
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {errors.uploadPictureHouse && (
                        <FormHelperText error>{errors.uploadPictureHouse.message}</FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="familyHistory"
                        control={control}
                        rules={{ required: "กรุณากรอกประวัติครอบครัว" }}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                label="เล่าประวัติครอบครัวคร่าวๆ และเหตุผลในการขอทุน มีความจำเป็น ความเดือนร้อน ความต้องการให้กองทุนฯช่วยเหลือ"
                                multiline
                                rows={5}
                                {...field}
                                error={!!errors.familyHistory}
                                helperText={errors.familyHistory?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary">
                Update
            </Button>
        </Box>
    );
};

export default StepTen;
