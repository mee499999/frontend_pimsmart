import { Student } from "@/types/IResponse";
import { Box, Grid, Typography, Button, FormHelperText } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

interface RegisterFormProps {
    formMethods: UseFormReturn<Student>;
}

const StepTen: React.FC<RegisterFormProps> = ({ formMethods }) => {
    const {
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = formMethods;

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Store selected files in an array

    const onSubmit = (data: Student) => {
        console.log("Form Data: ", data);

        // Log selected files if any
        if (selectedFiles.length > 0) {
            console.log("Selected Files: ", selectedFiles);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []); // Convert FileList to array

        // Append new files to the previously selected files
        const updatedFiles = [...selectedFiles, ...files];
        setSelectedFiles(updatedFiles);

        // Set the selected files in formMethods using setValue
        setValue("uploadPictureHouse", updatedFiles);

        // Log each file's name and size
        files.forEach((file, index) => {
            console.log(`File ${index + 1}:`);
            console.log(`  Name: ${file.name}`);
            console.log(`  Size: ${file.size} bytes`);
            console.log(`  Type: ${file.type}`);
        });
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
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        color="primary"
                    >
                        อัพโหลดอย่างน้อย 2 รูป ภาพรวมนอกบ้าน ภาพรวมในบ้าน
                        <input
                            type="file"
                            multiple
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>
                    {errors.uploadPictureHouse && (
                        <FormHelperText error>{errors.uploadPictureHouse.message}</FormHelperText>
                    )}
                </Grid>
                {selectedFiles.length > 0 && (
                    <Grid item xs={12}>
                        <Typography>Selected Files:</Typography>
                        <ul>
                            {selectedFiles.map((file, index) => (
                                <li style={{ marginBottom: '10px' }} key={index}>
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                    </Grid>
                )}

                {selectedFiles.length < 2 && (
                    <Grid item xs={12}>
                        <FormHelperText error>
                            กรุณาอัพโหลดรูปอย่างน้อย 2 รูป
                        </FormHelperText>
                    </Grid>
                )}
            </Grid>

            <Button type="submit" variant="contained" color="primary">
                Update
            </Button>
        </Box>
    );
};

export default StepTen;
