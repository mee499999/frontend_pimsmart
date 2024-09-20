import { Student } from "@/types/Register";
import { Box, Grid, Typography, Button, FormHelperText, TextField } from "@mui/material";
import { UseFormReturn, Controller, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import CustomFileUpload from "@/components/CustomFileUpload";

interface RegisterFormProps {
    formMethods: UseFormReturn<Student>;
}

const StepTen: React.FC<RegisterFormProps> = ({ formMethods }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        
    } = formMethods;

    const uploadPictureHouse = watch("uploadPictureHouse");
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
        setValue("uploadPictureHouse", updatedFiles, { shouldValidate: true });
    };

    const handleFileRemove = (fileToRemove: File) => {
        const updatedFiles = files.filter(file => file !== fileToRemove);
        setFiles(updatedFiles);
        setValue("uploadPictureHouse", updatedFiles, { shouldValidate: true });
    };

    const validateFiles = () => {
        if (files.length < 2) {
            setFileError("กรุณาอัพโหลดรูปอย่างน้อย 2 รูป");
            return false;
        }
        setFileError(null);
        return true;
    };

    const onSubmit = (data: Student) => {
        if (!validateFiles()) return;

        console.log("Form Data: ", data);
        console.log("Uploaded Files: ", data.uploadPictureHouse);

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

            {/* <Button type="submit" variant="contained" color="primary">
                Update
            </Button> */}
        </Box>
    );
};

export default StepTen;