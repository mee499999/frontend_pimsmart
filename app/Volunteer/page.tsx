"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Typography from '@mui/material/Typography';
import VolunteerForm from './components/VolunteerForm';
import SpecialWorkForm from './components/SpecialWorkForm';
import CheckHoursForm from './components/checkHour'
import { submitVolunteerForm } from '@/app/api/Volunteer'; // Import the API function
import { fetchVolunteerHours } from '@/app/api/CheckHour'; // Import the fetch function
import { FormValues } from '@/types/IResponse';


const CheckVolunteerHoursForm: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    studentId: '',
    firstName: '',
    activityName: '',
    organizationName: '',
    organizationPhone: '',
    activityDescription: '',
    activityDate: '',
    hours: '',
    createDate: new Date().toISOString().slice(0, 10),
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [volunteerHours, setVolunteerHours] = useState<number | null>(null);

  useEffect(() => {
    if (formValues.studentId) {
      fetchAndSetVolunteerHours(formValues.studentId);
    }
  }, [formValues.studentId]);

  const fetchAndSetVolunteerHours = async (studentId: string) => {
    try {
      const data = await fetchVolunteerHours(studentId);
      setVolunteerHours(data.hours);
    } catch (error) {
      console.error('Error fetching volunteer hours:', error);
      setError('Failed to fetch volunteer hours.');
    }
  };

  const handleSidebarClick = (formName: string) => {
    setSelectedForm(formName);
  };

  const handleSubmit = async (formValues: FormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await submitVolunteerForm(formValues); // Use the imported API function
      setSuccess('Volunteer hours submitted successfully!');
      console.log('Form submitted successfully with values:', formValues);
      
      // Fetch updated volunteer hours after successful submission
      if (formValues.studentId) {
        await fetchAndSetVolunteerHours(formValues.studentId);
      }

      // Optionally reset the form values or remove items from localStorage
      localStorage.removeItem('volunteerForm');
      setFormValues({
        studentId: '',
        firstName: '',
        activityName: '',
        organizationName: '',
        organizationPhone: '',
        activityDescription: '',
        activityDate: '',
        hours: '',
        createDate: new Date().toISOString().slice(0, 10),
      });
    } catch (error) {
      setError('An error occurred while submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout 
      sidebarItems={[
        { 
          text: 'ส่งชั่วโมงจิตอาสา', 
          hook: () => handleSidebarClick('volunteerForm') 
        },
        { 
          text: 'เช็คเวลา', 
          hook: () => handleSidebarClick('CheckHoursForm') 
        }
      ]}
    >
      <main>
        <Typography variant="h5" gutterBottom>
          {/* Optionally add a title or other content */}
        </Typography>
        {volunteerHours !== null && (
          <Typography variant="h6">
            Volunteer Hours: {volunteerHours}
          </Typography>
        )}
        {selectedForm === 'volunteerForm' && (
          <VolunteerForm 
            onSubmit={handleSubmit} 
            formValues={formValues} 
            setFormValues={setFormValues} 
            success={success} 
            error={error} 
            loading={loading}
          />
        )}
        {selectedForm === 'CheckHoursForm' && <CheckHoursForm />}
      </main>
    </Layout>
  );
};

export default CheckVolunteerHoursForm;
