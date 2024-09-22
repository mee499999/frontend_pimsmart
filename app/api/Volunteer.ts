import { ApiResponse, FormValues } from '@/types/IResponse';
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




export const sendVolunteerDataApi = async (
  volunteerData: FormValues,
  endpoint: string = '/volunteer-activities' // กำหนด endpoint ที่นี่
): Promise<ApiResponse> => {
  try {
    const response = await axiosApi.post<ApiResponse>(endpoint, volunteerData);

    return {
      success: true,
      message: 'Volunteer data sent successfully',
      data: response.data.data,
    };
  } catch (err: any) {
    return { success: false, message: err.response?.data?.message || err.message || 'Network error' };
  }
};

  


// API function to upload files
export const uploadFilesApi = async (
    files: File[],
    studentId: string,
    endpoint: string = '/volunteer-activities/uploadToGoogleDrive' // Default endpoint for file upload
  ): Promise<ApiResponse> => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('studentId', studentId); // Add studentId to form data
  
    try {
      const response = await axiosApi.post<ApiResponse>(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return {
        success: true,
        message: 'Files uploaded successfully',
        data: response.data.data,
      };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || err.message || 'Network error' };
    }
  };


