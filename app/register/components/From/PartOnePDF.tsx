import React from 'react';
import { Box, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { Student } from "@/types/Register";

interface RegisterFormProps {
  formMethods: UseFormReturn<Student>;
}

const PartOnePDF: React.FC<RegisterFormProps> = ({ formMethods }) => {
  const { register, watch } = formMethods;


  const prefixValue = watch('prefix');
  const thaiName = watch('thaiName');
  const lastName = watch('lastName');
  const nickname = watch('nickname');
  const studentId = watch('studentId');
  const dateOfBirth = watch('dateOfBirth');
  const currentlyStudyingYear = watch('currentlyStudyingYear');
  const block = watch('block');

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, mx: 'auto', my: 4 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <label >คำนำหน้า</label> {/* Fixed width for the label */}
            <span>{prefixValue}</span>
            <label>ชื่อ</label>
            <span>{thaiName}</span>
            <label>นามสกุล</label>
            <span>{lastName}</span>
            <label>ชื่อเล่น</label>
            <span>{nickname}</span>
            <label>รหัสนักเรียน</label>
            <span>{studentId}</span>

          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >

            <span>{currentlyStudyingYear}</span>
            <label>Block</label>
            <span>{block}</span>
            คณะ
            faculty

            สาขาวิชา
            fieldOfStudy
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >

            <label>เพศ</label>
            <input
              {...register('gender')}
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {/* ทุนการศึกษาที่ได้รับ
            scholarshipReceived

            ทุนการศึกษาอื่น ๆ
            otherScholarships

            เกรดเฉลี่ยปัจจุบัน
            currentGpa */}



          </Box>
        </Grid>

        <Grid item xs={12} md={6}>



        </Grid>

        <Grid item xs={12} md={6}>
          <label>กำลังศึกษาอยู่ปี</label>
          <input
            {...register('currentlyStudyingYear')}
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label>ประเภทนักศึกษา</label>
          <input
            {...register('studentType')}
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label>สถานที่เรียน</label>
          <input
            {...register('placeOfStudy')}
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label>โปรดระบุสถานที่เรียนอื่นๆ</label>
          <input
            {...register('otherPlace')}
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label>เกรดเฉลี่ยสะสมปัจจุบัน</label>
          <input
            {...register('currentGpa')}
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label>คณะ</label>
          <input
            {...register('faculty')}
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label>สาขาวิชา</label>
          <input
            {...register('fieldOfStudy')}
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label>หมายเลขโทรศัพท์เป็นข้อมูลที่จำเป็น</label>
          <input
            {...register('phoneNumber')}
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label>หมายเลขบัตรประชาชนเป็นข้อมูลที่จำเป็น</label>
          <input
            {...register('nationalId')}
            type="text"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label>Email</label>
          <input
            {...register('email')}
            type="email"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PartOnePDF;
