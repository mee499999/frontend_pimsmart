"use client";
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Typography from '@mui/material/Typography';
import VolunteerForm from './components/VolunteerForm';
import SpecialWorkForm from './components/SpecialWorkForm';

const CheckVolunteerHoursForm: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const handleSidebarClick = (formName: string) => {
    setSelectedForm(formName);
  };

  return (
    <Layout 
      contentTitle="ตรวจสอบชั่วโมงจิตอาสา" 
      sidebarItems={[
        { 
          text: 'ส่งชั่วโมงจิตอาสา', 
          hook: () => handleSidebarClick('volunteerForm') 
        },
        { 
          text: 'ส่งงานพิเศษ', 
          hook: () => handleSidebarClick('specialWorkForm') 
        }
      ]}
    >
      <main>
        <Typography variant="h5" gutterBottom>
          ตรวจสอบชั่วโมงจิตอาสา
        </Typography>
        {/* Conditionally render the selected form */}
        {selectedForm === 'volunteerForm' && <VolunteerForm />}
        {selectedForm === 'specialWorkForm' && <SpecialWorkForm />}
      </main>
    </Layout>
  );
};

export default CheckVolunteerHoursForm;
