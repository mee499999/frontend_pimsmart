

import axiosApi from '@/utils/Api'; // Ensure axiosApi is properly configured

// Function to handle special-work form submission
export const submitSpecialWorkForm = async (formData: any) => {
  try {
    console.log('Submitting form with data:', formData);
    const response = await axiosApi.post("/special-work", formData);
    return response.data;
  } catch (error: any) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error('Error submitting the special-work form');
  }
};

