import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import locationData from '@/components/ThaiPostcode/thailand-province-district-subdistrict-zipcode.json';

import { Location, Student } from '@/types/IResponse';
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
  const { control, register, handleSubmit, setValue, watch } = formMethods;

  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [subdistricts, setSubdistricts] = useState<string[]>([]);

  const currentProvince = watch('current_province');
  const currentDistrict = watch('current_district');

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
      setValue('current_province', province);
      setValue('current_district', district);
      setValue('current_subdistrict', subdistrict);
    } else {
      setValue('current_province', '');
      setValue('current_district', '');
      setValue('current_subdistrict', '');
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
    if (name === 'current_province') {
      updateDistricts(value);
    } else if (name === 'current_district') {
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
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, mx: 'auto', my: 4, padding: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        ข้อมูลที่อยู่
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="ที่อยู่ปัจจุบัน"
            {...register('current_address')}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="ที่อยู่ตามทะเบียนบ้าน"
            {...register('address_according_to_house_registration')}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="รหัสไปรษณีย์"
            {...register('postal_code', {
              onChange: handleInputChange
            })}
            variant="outlined"
            margin="normal"
            inputProps={{ maxLength: 5 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>จังหวัด</InputLabel>
            <Controller
              name="current_province"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="จังหวัด"
                  onChange={(event) => handleSelectChange('current_province', event.target.value)}
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
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>อำเภอ</InputLabel>
            <Controller
              name="current_district"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="อำเภอ"
                  onChange={(event) => handleSelectChange('current_district', event.target.value)}
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
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>ตำบล</InputLabel>
            <Controller
              name="current_subdistrict"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="ตำบล"
                  onChange={(event) => handleSelectChange('current_subdistrict', event.target.value)}
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Update
      </Button>
    </Box>
  );
};

export default Addresses;
