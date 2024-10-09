import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import locationData from '@/components/ThaiPostcode/thailand-province-district-subdistrict-zipcode.json';

import { Location, Student } from '@/types/Register';
import { Controller, UseFormReturn } from 'react-hook-form';

interface RegisterFormProps {
  formMethods: UseFormReturn<Student>;
}

const locations: Location[] = (locationData as any[]).map(item => ({
  province: item.province,
  district: item.district,
  subdistrict: item.subdistrict,
  zipcode: item.zipcode.toString()
}));

const Addresses: React.FC<RegisterFormProps> = ({ formMethods }) => {
  const { control, register, handleSubmit,formState: { errors }, setValue, watch } = formMethods;

  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [subdistricts, setSubdistricts] = useState<string[]>([]);

  const currentProvince = watch('province');
  const currentDistrict = watch('district');

  useEffect(() => {
    const provincesArray = Array.from(new Set(locations.map(location => location.province)));
    setProvinces(provincesArray);
  }, []);

  useEffect(() => {
    if (currentProvince) {
      updateDistricts(currentProvince);
    }
  }, [currentProvince]);

  useEffect(() => {
    if (currentDistrict) {
      updateSubdistricts(currentDistrict);
    }
  }, [currentDistrict]);

  const handleZipcodeChange = (zipcode: string) => {
    const foundLocation = locations.find(location => location.zipcode === zipcode);

    if (foundLocation) {
      const { province, district, subdistrict } = foundLocation;
      setValue('province', province);
      setValue('district', district);
      setValue('subdistrict', subdistrict);
    } else {
      setValue('province', '');
      setValue('district', '');
      setValue('subdistrict', '');
    }
  };

  const updateDistricts = (province: string) => {
    const districtsArray = Array.from(new Set(
      locations.filter(location => location.province === province)
        .map(location => location.district)
    ));
    setDistricts(districtsArray);
    setSubdistricts([]);
  };

  const updateSubdistricts = (district: string) => {
    const subdistrictsArray = Array.from(new Set(
      locations.filter(location => location.district === district)
        .map(location => location.subdistrict)
    ));
    setSubdistricts(subdistrictsArray);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValue(name as keyof Student, value);
    if (name === 'postal_code') {
      handleZipcodeChange(value);
    }
  };

  const handleSelectChange = (name: keyof Student, value: string) => {
    setValue(name, value);
    if (name === 'province') {
      updateDistricts(value);
    } else if (name === 'district') {
      updateSubdistricts(value);
    }
  };

  const onSubmit = (data: Student) => {
    console.log('Submitted data:', data);
    // Handle form submission logic here
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, mx: 'auto', my: 4 }}
    >
      <Typography color="secondary" align="center" sx={{ mt: 2 }}>
        ข้อมูลที่อยู่
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="ที่อยู่ปัจจุบัน ชื่อที่พัก หอพักขณะเรียน"
            {...register('currentAddress')}
            variant="outlined"

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>นักศึกษาพักอยู่</InputLabel>
            <Controller
              name="studentResident"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  label="นักศึกษาพักอยู่"
                  {...field}
                  error={!!errors.studentResident}
                >
                  <MenuItem value="บ้านตนเอง">บ้านตนเอง</MenuItem>
                  <MenuItem value="บ้านญาติ">บ้านญาติ</MenuItem>
                  <MenuItem value="บ้านเช่า/หอพัก">บ้านเช่า/หอพัก</MenuItem>
                  <MenuItem value="ยังไม่มี (กรณีนักศึกษาใหม่ยังไม่หาหอ)">ยังไม่มี (กรณีนักศึกษาใหม่ยังไม่หาหอ)</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="จำนวนผู้พักอาศัย (หอพัก)"
            {...register('numberOfResidents')}
            variant="outlined"

          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="ที่อยู่ตามทะเบียนบ้าน"
            {...register('addressAccordingToHouseRegistration')}
            variant="outlined"

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="รหัสไปรษณีย์"
            {...register('postalCode', {
              onChange: handleInputChange
            })}
            variant="outlined"

            inputProps={{ maxLength: 5 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>จังหวัด</InputLabel>
            <Controller
              name="province"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="จังหวัด"
                  onChange={(event) => handleSelectChange('province', event.target.value)}
                  value={field.value}
                >
                  {provinces.map(province => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>อำเภอ</InputLabel>
            <Controller
              name="district"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="อำเภอ"
                  onChange={(event) => handleSelectChange('district', event.target.value)}
                  value={field.value}
                >
                  {districts.map(district => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>ตำบล</InputLabel>
            <Controller
              name="subdistrict"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="ตำบล"
                  onChange={(event) => handleSelectChange('subdistrict', event.target.value)}
                  value={field.value}
                >
                  {subdistricts.map(subdistrict => (
                    <MenuItem key={subdistrict} value={subdistrict}>
                      {subdistrict}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
      {/* <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Update
      </Button> */}
    </Box>
  );
};

export default Addresses;
