import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import RegisterAdmin from '@/app/register/components/From/RegisterAdmin';
import StudentTenImg from '@/app/register/components/From/StudentTenImg';
import StudentTwelveImg from '@/app/register/components/From/StudentTwelveImg';
import StepElevenImg from '@/app/register/components/From/StepElevenImg';
import { Student } from '@/types/Register';
import { UseFormReturn } from 'react-hook-form';
import { useStudentAdminApi } from '@/hooks/Admin/RegisterAdmin';
import { FileWithMetadata } from '@/types/IResponse';
import TabCards from '@/components/TabCards';
import Addresses from '@/app/register/components/From/addresses';
import Scholarships from '@/app/register/components/From/Scholarships';
import StepEight from '@/app/register/components/From/StepEight';
import StepFive from '@/app/register/components/From/StepFive';
import StepNine from '@/app/register/components/From/StepNine';
import StepSeven from '@/app/register/components/From/StepSeven';
import StepSix from '@/app/register/components/From/StepSix';
import Studentpersonalinformation from '@/app/register/components/From/Studentpersonalinformation';

interface RegisterFormProps {
  formMethods: UseFormReturn<Student>;
}

const AdminTabCards: React.FC<RegisterFormProps> = ({ formMethods }) => {
  const { control, register, handleSubmit, formState: { errors }, setValue, watch } = formMethods;
  const [studentImages, setStudentImages] = useState<FileWithMetadata[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const { loading, sendStudentData, uploadFiles } = useStudentAdminApi();

  const onSubmit = async (data: Student) => {
    const { uploadPictureHouse, volunteerPictures, studentPicture } = data;
  
    // Check for required uploads
    if (
      (!uploadPictureHouse || uploadPictureHouse.length < 2) ||
      (!volunteerPictures || volunteerPictures.length < 1) ||
      (!studentPicture)
    ) {
      alert("โปรดตรวจสอบให้แน่ใจว่าได้อัปโหลดไฟล์ที่จำเป็นทั้งหมดแล้ว");
      return;
    }
  
    console.log("Form Data: ", data);
  
    const { studentId, firstName } = data; // Destructure these properties
  
    if (!studentId || !firstName) {
      alert("ไม่พบข้อมูล studentId หรือ firstName");
      return;
    }
  
    // Group files by their type for uploading
    const fileGroups = [
      { files: Array.from(uploadPictureHouse || []), imageType: "uploadPictureHouse" },
      { files: Array.from(volunteerPictures || []), imageType: "volunteerPictures" },
      { files: Array.from(studentPicture || []), imageType: "studentPicture" }
    ].filter(group => group.files.length > 0);
  
    // Sending student data
    const sendResult = await sendStudentData(data);
    if (!sendResult) {
      alert("การส่งข้อมูลนักเรียนล้มเหลว");
      return;
    }
  
    // Check and log student images
    console.log("=== Received Student Images ===", studentImages);
  
    for (const group of fileGroups) {
      console.log(`--- Processing File Group for Image Type: ${group.imageType} ---`);
      console.log(`Files in group:`, group.files);
  
      const filesArray: File[] = Array.isArray(group.files) ? group.files : Array.from(group.files as FileList);
  
      const { matchedFiles, unmatchedFiles } = filesArray.reduce((acc, file: File) => {
        // Split names in studentImages for comparison
        const studentImageNames = studentImages.flatMap(img => img.name.split(',').map((name: string) => name.trim()));
      
        // Check if the file is already uploaded
        const isFileAlreadyUploaded = studentImageNames.includes(file.name);
      
        if (isFileAlreadyUploaded) {
          console.warn(`File "${file.name}" "${group.imageType}" Skipping.`);
          acc.matchedFiles.push(file); // Add to matched
        } else {
          console.log(`File "${file.name}" "${group.imageType}" upload.`);
          acc.unmatchedFiles.push(file); // Add to unmatched
        }
        return acc;
      }, { matchedFiles: [] as File[], unmatchedFiles: [] as File[] });
      
  
      console.log(`Matched Files for ${group.imageType}:`, matchedFiles.map(file => file.name));
      console.log(`Unmatched Files for ${group.imageType}:`, unmatchedFiles.map(file => file.name));
  
      // Upload all unmatched files regardless of studentImages content
      if (unmatchedFiles.length > 0 || studentImages.length === 0) {
        console.log(`Uploading ${unmatchedFiles.length} new files for imageType "${group.imageType}":`, unmatchedFiles);
        await uploadFiles(unmatchedFiles, studentId, firstName, group.imageType);
      } else {
        console.log(`No new files to upload for imageType: "${group.imageType}".`);
      }
  
      console.log(`--- Finished Processing File Group for Image Type: ${group.imageType} ---\n`);
    }
  };

  
  




  const handleImagesUpdate = (images: FileWithMetadata[], imageType: string) => {
    setStudentImages(prevState => {
      const updatedImages = [...prevState.filter(img => img.imageType !== imageType), ...images.map(image => ({ ...image, imageType }))];
      console.log("Updated Images: ", updatedImages);
      return updatedImages;
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, mx: "auto" }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        <Button type="button" onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)} disabled={currentStep === 0}>Back</Button>
        <Button type="button" onClick={() => currentStep < 11 && setCurrentStep(prev => prev + 1)} disabled={currentStep === 11}>Next</Button>
      </Box>
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
          { label: 'Step 10', component: <StudentTenImg formMethods={formMethods} onImagesUpdate={(images) => handleImagesUpdate(images, 'studentPicture')} /> },
          { label: 'Step 11', component: <StudentTwelveImg formMethods={formMethods} onImagesUpdate={(images) => handleImagesUpdate(images, 'uploadPictureHouse')} /> },
          { label: 'Step 12', component: <StepElevenImg formMethods={formMethods} onImagesUpdate={(images) => handleImagesUpdate(images, 'volunteerPictures')} /> },
        ]}
        currentStep={currentStep}
        onTabChange={setCurrentStep}
      />
    </Box>
  );
};

export default AdminTabCards;
