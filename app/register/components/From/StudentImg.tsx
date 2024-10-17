import { Student } from "@/types/Register";
import { Box, Grid, Typography, FormHelperText, CircularProgress } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import CustomFileUpload from "@/components/CustomFileUpload";
import { useStudentImages } from "@/hooks/Admin/useStudentImages";

interface RegisterFormProps {
    formMethods: UseFormReturn<Student>;
}

const base64ToFile = (base64String: string, fileName: string): File => {
    const byteCharacters = atob(base64String);
    const byteNumbers = Array.from({ length: byteCharacters.length }, (_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], fileName, { type: 'image/jpeg' }); // Adjust the type if necessary
};

const StudentImg: React.FC<RegisterFormProps> = ({ formMethods }) => {
    const { control, handleSubmit, setValue, watch } = formMethods;

    const studentPicture = watch("studentPicture");
    const [files, setFiles] = useState<File[]>([]);
    const [fileError, setFileError] = useState<string | null>(null);
    const studentId = watch("studentId");
    const imageType = "studentPicture";
    const { loading: loadingImages, images, error, fetchStudentImages } = useStudentImages();
    const fetchCount = useRef(0);
    const Count = useRef(0);
    const [isFetching, setIsFetching] = useState(false);

    const fetchImages = async () => {
        if (studentId && (!files.length) && !isFetching && (!studentPicture || studentPicture.length === 0)) {
            setIsFetching(true);
            try {
                await fetchStudentImages(studentId, imageType);
                fetchCount.current += 1;
                console.log("เรียกใช้ครั้งที่ ", fetchCount.current);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setIsFetching(false);
            }
        } else if (studentPicture && studentPicture.length > 0) {
            console.log("มีข้อมูลใน studentPicture แล้ว ไม่ต้องโหลดซ้ำ");
        }
    };
    
    // Automatically call fetchImages whenever studentId changes
    useEffect(() => {
        fetchImages();
    }, [studentId, studentPicture]); // เพิ่ม studentPicture ใน dependency array
    

    useEffect(() => {
        if (images && images.length > 0) {
            const imageFiles = images.map((imageObj) => base64ToFile(imageObj.image, imageObj.name));
            // Check if files are different and update state
            if (JSON.stringify(imageFiles) !== JSON.stringify(files)) {
                setFiles(imageFiles);
                setValue("studentPicture", imageFiles, { shouldValidate: true });
                Count.current += 1; // Increment the fetch count
                console.log("ครั้งที่ ", Count.current);
                console.log("image ", images);
            }
        }
    }, [images, setValue, files]);

    useEffect(() => {
        if (studentPicture) {
            setFiles(Array.isArray(studentPicture) ? studentPicture : Array.from(studentPicture));
        }
    }, [studentPicture]);

    const handleFileChange = (newFiles: File[]) => {
        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        setValue("studentPicture", updatedFiles, { shouldValidate: true });
    };

    const handleFileRemove = (fileToRemove: File) => {
        const updatedFiles = files.filter(file => file !== fileToRemove);
        setFiles(updatedFiles);
        setValue("studentPicture", updatedFiles, { shouldValidate: true });
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
        console.log("Uploaded Files: ", data.studentPicture);

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
                อัพโหลดรูปนักศึกษา 1 รูป เป็นรูปหน้าตรง เห็นหน้าชัดเจน ไม่สวมแว่นกันแดดหรือแมสปิดใบหน้า
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomFileUpload
                        value={files}
                        multiple
                        onChange={handleFileChange}
                        onRemove={handleFileRemove}
                        accept="image/*"
                    />
                    {fileError && <FormHelperText error>{fileError}</FormHelperText>}
                </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" color="primary" align="center">
                    รูปภาพที่อัพโหลด
                </Typography>
                {loadingImages ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {files.length > 0 ? (
                            files.map((file, index) => (
                                <Grid item xs={4} key={index}>
                                    <Box
                                        component="img"
                                        src={URL.createObjectURL(file)} // Use the local URL for the file
                                        alt={file.name}
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: 1,
                                            boxShadow: 1,
                                        }}
                                    />
                                    {/* <Typography variant="caption" align="center">{file.name}</Typography> */}
                                </Grid>
                            ))
                        ) : (
                            <Typography align="center">No images available</Typography>
                        )}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default StudentImg;
