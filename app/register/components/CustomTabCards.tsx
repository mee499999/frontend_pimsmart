// components/CustomTabCards.tsx
import React from 'react';

import TabCards from '@/components/TabCards';
import { Student } from '@/types/Register';
import RegisterForm from './From/RegisterForm';
import Addresses from './From/addresses';
import Scholarships from './From/Scholarships';
import StepEight from './From/StepEight';
import StepEleven from './From/StepEleven';
import StepFive from './From/StepFive';
import StepNine from './From/StepNine';
import StepSeven from './From/StepSeven';
import StepSix from './From/StepSix';
import StepTen from './From/StepTen';
import Studentpersonalinformation from './From/Studentpersonalinformation';
import { UseFormReturn } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import StepTwelve from './From/StepTwelve';
import { useStudentApi } from '@/hooks/RegisterH';
import { sendStudentDataApi } from '@/app/api/Register';

interface RegisterFormProps {
  formMethods: UseFormReturn<Student>;
}



const CustomTabCards: React.FC<RegisterFormProps> = ({ formMethods }) => {
  const { control, register, handleSubmit, formState: { errors }, setValue, watch } = formMethods;
  const { loading, error, response, sendStudentData, uploadFiles } = useStudentApi();


  const onSubmit = async (data: Student) => {
    const { uploadPictureHouse, volunteerPictures, studentPicture } = data;
  
    if 
    // (!uploadPictureHouse || uploadPictureHouse.length < 2) ||
    // (!volunteerPictures || volunteerPictures.length < 1) ||
    (!studentPicture) 
    {
      alert("โปรดตรวจสอบให้แน่ใจว่าได้อัปโหลดไฟล์ที่จำเป็นทั้งหมดแล้ว");
      return;
    }
  
    console.log("Form Data: ", data);
    const result = await sendStudentData(data);
  
    const studentId = data.studentId;
    const firstName = data.firstName;
  
    if (!studentId || !firstName) {
      alert("ไม่พบข้อมูล studentId หรือ firstName");
      return;
    }
  
    // สร้างชุดของไฟล์และ imageType
    const fileGroups = [
      { files: Array.from(uploadPictureHouse || []), imageType: "uploadPictureHouse" },
      { files: Array.from(volunteerPictures || []), imageType: "volunteerPictures" },
      { files: Array.from(studentPicture || []), imageType: "studentPicture" }
    ];
  
    // กรองเอาเฉพาะกลุ่มที่มีไฟล์
    const validFileGroups = fileGroups.filter(group => group.files.length > 0);
  
    for (const group of validFileGroups) {
      await uploadFiles(group.files, studentId, firstName, group.imageType);
    }
  };
  
  


  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        // maxWidth: 800,
        mx: "auto",
        my: 4,
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          ส่งข้อมูล
        </Button>
      </Box>

      <TabCards
        tabs={[
          { label: 'Step 1', component: <RegisterForm formMethods={formMethods} /> },
          { label: 'Step 2', component: <Addresses formMethods={formMethods} /> },
          { label: 'Step 3', component: <Scholarships formMethods={formMethods} /> },
          { label: 'Step 4', component: <Studentpersonalinformation formMethods={formMethods} /> },
          { label: 'Step 5', component: <StepFive formMethods={formMethods} /> },
          { label: 'Step 6', component: <StepSix formMethods={formMethods} /> },
          { label: 'Step 7', component: <StepSeven formMethods={formMethods} /> },
          { label: 'Step 8', component: <StepEight formMethods={formMethods} /> },
          { label: 'Step 9', component: <StepNine formMethods={formMethods} /> },
          { label: 'Step 10', component: <StepTen formMethods={formMethods} /> },
          { label: 'Step 11', component: <StepEleven formMethods={formMethods} /> },
          { label: 'Step 12', component: <StepTwelve formMethods={formMethods} /> },
        ]}
      />
    </Box>
  );
};

export default CustomTabCards;
