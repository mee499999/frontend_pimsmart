import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import TabCards from '@/components/TabCards';
import { Student } from '@/types/Register';
import { useStudentApi } from '@/hooks/RegisterH';
import { UseFormReturn } from 'react-hook-form';
import Addresses from '@/app/register/components/From/addresses';
import RegisterForm from '@/app/register/components/From/RegisterForm';
import Scholarships from '@/app/register/components/From/Scholarships';
import StepEight from '@/app/register/components/From/StepEight';
import StepEleven from '@/app/register/components/From/StepEleven';
import StepFive from '@/app/register/components/From/StepFive';
import StepNine from '@/app/register/components/From/StepNine';
import StepSeven from '@/app/register/components/From/StepSeven';
import StepSix from '@/app/register/components/From/StepSix';
import Studentpersonalinformation from '@/app/register/components/From/Studentpersonalinformation';
import RegisterAdmin from '@/app/register/components/From/RegisterAdmin';
import StudentTenImg from '@/app/register/components/From/StudentTenImg';
import StepTwelve from '@/app/register/components/From/StepTwelve';
import StudentTwelveImg from '@/app/register/components/From/StudentTwelveImg';
import StepElevenImg from '@/app/register/components/From/StepElevenImg';
import { useStudentAdminApi } from '@/hooks/Admin/RegisterAdmin';

interface RegisterFormProps {
  formMethods: UseFormReturn<Student>;
  
}

const AdminTabCards: React.FC<RegisterFormProps> = ({ formMethods }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Destructure formAdmin methods for easier access
  const { control, register, handleSubmit, formState: { errors }, setValue, watch } = formMethods;
  const { loading, sendStudentData, uploadFiles } = useStudentAdminApi();

  const onSubmit = async (data: Student) => {
    const { uploadPictureHouse, volunteerPictures, studentPicture } = data;

    if (
      (!uploadPictureHouse || uploadPictureHouse.length < 2) ||
      (!volunteerPictures || volunteerPictures.length < 1) ||
      (!studentPicture)
    ) {
      alert("โปรดตรวจสอบให้แน่ใจว่าได้อัปโหลดไฟล์ที่จำเป็นทั้งหมดแล้ว");
      return;
    }

    console.log("Form Data: ", data);

    const studentId = data.studentId;
    const firstName = data.firstName;

    if (!studentId || !firstName) {
      alert("ไม่พบข้อมูล studentId หรือ firstName");
      return;
    }

    // Group files by their type for uploading
    const fileGroups = [
      { files: Array.from(uploadPictureHouse || []), imageType: "uploadPictureHouse" },
      { files: Array.from(volunteerPictures || []), imageType: "volunteerPictures" },
      { files: Array.from(studentPicture || []), imageType: "studentPicture" }
    ].filter(group => group.files.length > 0); // Filter only groups with files

    // Send student data first
    const sendResult = await sendStudentData(data);
    if (!sendResult) {
      alert("การส่งข้อมูลนักเรียนล้มเหลว");
      return;
    }

    // Upload files after data is sent successfully
    for (const group of fileGroups) {
      await uploadFiles(group.files, studentId, firstName, group.imageType);
    }
  };

  // Helper functions for navigating steps
  const nextStep = () => setCurrentStep(prev => (currentStep < 11 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (currentStep > 0 ? prev - 1 : prev));



  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mx: "auto" }}
    >


      <Box display="flex" justifyContent="center" alignItems="center">
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Button type="button" onClick={prevStep} disabled={currentStep === 0}>
          Back
        </Button>
        <Button type="button" onClick={nextStep} disabled={currentStep === 11}>
          Next
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <TabCards
          tabs={[
            { label: 'Step 1', component: <RegisterAdmin formMethods={formMethods} /> },
            { label: 'Step 2', component: <Addresses formMethods={formMethods} /> },
            { label: 'Step 3', component: <Scholarships formMethods={formMethods} /> },
            { label: 'Step 4', component: <Studentpersonalinformation formMethods={formMethods} /> },
            { label: 'Step 5', component: <StepFive formMethods={formMethods} /> },
            { label: 'Step 6', component: <StepSix formMethods={formMethods} /> },
            { label: 'Step 7', component: <StepSeven formMethods={formMethods} /> },
            { label: 'Step 8', component: <StepEight formMethods={formMethods} /> },
            { label: 'Step 9', component: <StepNine formMethods={formMethods} /> },
            { label: 'Step 10', component: <StudentTenImg formMethods={formMethods} /> },
            { label: 'Step 11', component: <StepElevenImg formMethods={formMethods} /> },
            { label: 'Step 12', component: <StudentTwelveImg formMethods={formMethods} /> },
          ]}
          currentStep={currentStep}
          onTabChange={setCurrentStep}
        />
      </Box>
    </Box>
  );
};

export default AdminTabCards;
