import axiosApi from '@/utils/Api'; // Ensure axiosApi is properly configured

// Function to handle volunteer form submission
export const submitVolunteerForm = async (formData: any) => {
  try {
    console.log(formData)
    const response = await axiosApi.post("/volunteer-activities", formData);
    return response.data; // Return the data from the API response
  } catch (error) {
    throw new Error('Error submitting the volunteer form');
  }
};

