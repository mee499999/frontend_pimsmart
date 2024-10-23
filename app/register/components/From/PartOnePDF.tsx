import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { Student } from "@/types/Register";

interface RegisterFormProps {
  formMethods: UseFormReturn<Student>;
}

const MAX_LINE_LENGTH = 100; // Maximum characters per line before reducing font size

const PartOnePDF: React.FC<RegisterFormProps> = ({ formMethods }) => {
  const { watch, setValue } = formMethods;

  // Watch for necessary form values
  const placeOfStudy = watch('placeOfStudy');

  // Function to truncate strings to a specified length
  const formatInfo = (...args: (string | undefined)[]) => {
    // Filter out empty strings and join with " ... "
    return args.filter(Boolean).join(' ... ');
  };

  const padString = (label: string, value: string | undefined, length: number = 20) => {
    const paddedValue = typeof value === 'string' ? value.trim() : ''; // Ensure value is a string
    return `${label} ${paddedValue.padEnd(length, ' ')}`; // Pad the string to the right
  };

  const fullName = formatInfo(
    padString('ข้าพเจ้า', watch('prefix')),
    padString('ชื่อจริง', watch('thaiName')),
    padString('นามสกุล', watch('lastName')),
    padString('ชื่อเล่น', watch('nickname')),
    padString('รหัสนักศึกษา', watch('studentId')),
  );

  const academicInfo = formatInfo(
    padString('ปีการศึกษา', watch('currentlyStudyingYear')),
    padString('Block', watch('block')),
    padString('คณะ', watch('faculty')),
    padString('สาขา', watch('fieldOfStudy'))
  );

  const scholarshipInfo = formatInfo(
    padString('ทุนการศึกษาที่ได้รับ', watch('scholarshipReceived')),
    padString('ทุนอื่น ๆ', watch('otherScholarships')),
    padString('เกรดเฉลี่ยปัจจุบัน', watch('currentGpa'))
  );

  const advisorInfo = formatInfo(
    padString('อาจารย์ที่ปรึกษา ชื่อ-นามสกุล', watch('advisorNameSurname')),
    padString('เบอร์โทรอาจารย์ที่ปรึกษา', watch('advisorPhoneNumber'))
  );

  const schoolInfo = formatInfo(
    padString('สถานที่ศึกษา', watch('placeOfStudy')),
    padString('จบจากโรงเรียน', watch('graduatedFromSchool')),
    padString('จังหวัด(โรงเรียน)', watch('provinceSchool'))
  );

  // Function to determine font size based on line length or specific criteria
  const getFontSize = (label: string) => {
    if (['ข้าพเจ้า', 'ชื่อจริง', 'นามสกุล', 'ชื่อเล่น', 'รหัสนักศึกษา'].includes(label)) {
      return '14px'; // Font size for headings
    }
    return '12px'; // Font size for values
  };

  return (
    <Box sx={{ marginTop: '10mm' }}>
      <Typography variant="h6" sx={{ fontSize: getFontSize('ข้าพเจ้า') }}>
        {fullName}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: getFontSize('ปีการศึกษา') }}>
        {academicInfo}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: getFontSize('ทุนการศึกษาที่ได้รับ') }}>
        {scholarshipInfo}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: getFontSize('อาจารย์ที่ปรึกษา ชื่อ-นามสกุล') }}>
        {advisorInfo}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: getFontSize('สถานที่ศึกษา') }}>
        {schoolInfo}
      </Typography>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={placeOfStudy === "แจ้งวัฒนะ"}
              onChange={() => {
                setValue('placeOfStudy', 'แจ้งวัฒนะ');
              }}
            />
          }
          label="แจ้งวัฒนะ"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={placeOfStudy === "วิทยาเขต EEC"}
              onChange={() => {
                setValue('placeOfStudy', 'วิทยาเขต EEC');
              }}
            />
          }
          label="วิทยาเขต EEC"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={placeOfStudy === "ศูนย์การเรียน"}
              onChange={() => {
                setValue('placeOfStudy', 'ศูนย์การเรียน');
              }}
            />
          }
          label="ศูนย์การเรียน จังหวัด"
        />
        สถานที่ศึกษาอื่นๆ: {watch('otherPlace') || ''}
      </Box>
    </Box>
  );
};

export default PartOnePDF;
