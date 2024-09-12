"use client"; // Add this line at the top of your file

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Typography from '@mui/material/Typography';
import VolunteerForm from './components/VolunteerForm';
import SpecialWorkForm from './components/SpecialWorkForm';
import CheckHoursForm from './components/checkHour';
import CheckHoursWork from './components/checkHourWork';
import { submitVolunteerForm } from '@/app/api/Volunteer'; // Import the API function to submit volunteer forms
import { fetchVolunteerHours } from '@/app/api/CheckHour'; // Import the function to fetch volunteer hours
import { FormValues } from '@/types/IResponse'; // Import the FormValues type

const CheckVolunteerHoursForm: React.FC = () => {
  // State to manage which form is currently selected
  const [selectedForm, setSelectedForm] = useState<string>('volunteerForm');

  // State to manage the form values for volunteer hours submission
  const [formValues, setFormValues] = useState<FormValues>({
    studentId: '',
    firstName: '',
    activityName: '',
    organizationName: '',
    organizationPhone: '',
    activityDescription: '',
    activityDate: '',
    hours: '',
    createDate: new Date().toISOString().slice(0, 10), // Set default createDate to current date
  });

  // States to handle success, error, and loading indicators
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // State to store volunteer hours fetched from the API
  const [volunteerHours, setVolunteerHours] = useState<number | null>(null);

  // Effect to fetch volunteer hours only if the selected form is 'CheckHoursForm' and studentId is present
  useEffect(() => {
    if (selectedForm === 'CheckHoursForm' && formValues.studentId) {
    console.log('-------------',formValues);
    
      fetchAndSetVolunteerHours(formValues.studentId);
    }
  }, [formValues.studentId, selectedForm]);

  // Function to fetch and set volunteer hours based on studentId
  const fetchAndSetVolunteerHours = async (studentId: string) => {
    try {
      const data = await fetchVolunteerHours(studentId); // Fetch data from API
      setVolunteerHours(data.hours); // Update state with fetched hours
    } catch (error) {
      console.error('Error fetching volunteer hours:', error);
      setError('Failed to fetch volunteer hours.'); // Handle API fetch error
    }
  };

  // Function to handle sidebar form selection
  const handleSidebarClick = (formName: string) => {
    setSelectedForm(formName); // Update selected form
    setSuccess(null); // Clear success message
    setError(null); // Clear error message
    if (formName !== 'CheckHoursForm') {
      setVolunteerHours(null); // Clear volunteer hours when not in 'CheckHoursForm'
    }
  };

  // Function to handle form submission
  const handleSubmit = async (formValues: FormValues) => {
    setLoading(true); // Show loading indicator
    setError(null); // Reset error message
    setSuccess(null); // Reset success message

    try {
      await submitVolunteerForm(formValues); // Submit form data to API
      setSuccess('Volunteer hours submitted successfully!'); // Show success message
      console.log('Form submitted successfully with values:', formValues);

      // Optionally update volunteer hours if studentId is present and form is 'CheckHoursForm'
      if (formValues.studentId && selectedForm === 'CheckHoursForm') {
        await fetchAndSetVolunteerHours(formValues.studentId);
      }

      // Optionally reset the form values or clear local storage
      // localStorage.removeItem('volunteerForm'); // Remove form data from local storage
      // setFormValues({
      //   studentId: '',
      //   firstName: '',
      //   activityName: '',
      //   organizationName: '',
      //   organizationPhone: '',
      //   activityDescription: '',
      //   activityDate: '',
      //   hours: '',
      //   createDate: new Date().toISOString().slice(0, 10), // Reset form fields
      // });
    } catch (error) {
      setError('An error occurred while submitting the form. Please try again.'); // Show error message
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <Layout
      sidebarItems={[
        {
          text: 'ส่งชั่วโมงจิตอาสา',
          hook: () => handleSidebarClick('volunteerForm'), // Switch to volunteer form
        },
        {
          text: 'เช็คชั่วโมงจิตอาสา',
          hook: () => handleSidebarClick('CheckHoursForm'), // Switch to check volunteer hours form
        },
        {
          text: 'งานพิเศษ',
          hook: () => handleSidebarClick('SpecialWorkForm'), // Switch to special work form
        },
        {
          text: 'เช็คชัวโมงงานพิเศษ',
          hook: () => handleSidebarClick('CheckHoursWork'), // Switch to check special work hours form
        },
      ]}
    >
      <main>
        <Typography variant="h5" gutterBottom>
          {/* Optional title or content */}
        </Typography>

        {/* Conditionally display volunteer hours only if 'CheckHoursForm' is selected */}
        {selectedForm === 'CheckHoursForm' && volunteerHours !== null && (
          <Typography variant="h6">Volunteer Hours: {volunteerHours}</Typography>
        )}

        {/* Render the appropriate form based on the selected sidebar item */}
        {selectedForm === 'volunteerForm' && (
          <VolunteerForm
            onSubmit={handleSubmit} // Function to handle form submission
            formValues={formValues} // Pass form values to the component
            setFormValues={setFormValues} // Allow form values to be updated
            success={success} // Show success message
            error={error} // Show error message
            loading={loading} // Show loading state
          />
        )}
        {selectedForm === 'CheckHoursForm' && <CheckHoursForm />} {/* Render CheckHoursForm */}
        {selectedForm === 'SpecialWorkForm' && <SpecialWorkForm />} {/* Render SpecialWorkForm */}
        {selectedForm === 'CheckHoursWork' && <CheckHoursWork />} {/* Render CheckHoursWork */}
      </main>
    </Layout>
  );
};

export default CheckVolunteerHoursForm;
