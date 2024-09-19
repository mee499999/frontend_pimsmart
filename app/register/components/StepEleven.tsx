import { Student } from "@/types/IResponse";
import { Box, Grid, Typography, Button, FormHelperText } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import CustomFileUpload from "@/app/Volunteer/components/CustomFileUpload";

interface RegisterFormProps {
    formMethods: UseFormReturn<Student>;
}

const StepEleven: React.FC<RegisterFormProps> = ({ formMethods }) => {
    const {
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
    } = formMethods;

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [fileError, setFileError] = useState<string | null>(null);

    const handleFileChange = (files: File[]) => {
        setSelectedFiles(files);
        setValue("volunteerPictures", files);
        clearErrors("uploadPictureHouse");
        setFileError(null);
    };

    const onSubmit = (data: Student) => {
        if (selectedFiles.length < 2) {
            setFileError("กรุณาอัพโหลดรูปอย่างน้อย 2 รูป");
            return;
        }

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
                ภาพทำจิตอาสา 1-5 รูป เป็นจิอาสาที่ทำย้อนหลังไม่เกิน 1 ปี
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        ภาพทำจิตอาสา 1-5 รูป เป็นจิอาสาที่ทำย้อนหลังไม่เกิน 1 ปี
                    </Typography>
                    <CustomFileUpload
                        value={selectedFiles}
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {fileError && (
                        <FormHelperText error>{fileError}</FormHelperText>
                    )}
                </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary">
                Update
            </Button>
        </Box>
    );
};

export default StepEleven;
