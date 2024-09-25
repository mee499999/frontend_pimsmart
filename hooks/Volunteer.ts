// hooks/RegisterH.ts
import { useState } from 'react';
import { Student } from '@/types/Register';
import { sendVolunteerDataApi, uploadFilesApi } from '@/app/api/Volunteer';

// Define the response type for the backend
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Custom hook for managing student API calls
export const useStudentApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const sendStudentData = async (studentData: Student): Promise<ApiResponse | null> => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await sendVolunteerDataApi(studentData); // Use the API function

      if (result.success) {
        setResponse(result); // Save response
        return result; // Return the result
      } else {
        setError(result.message);
        return null; // Return null in case of error
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
      return null; // Return null in case of exception
    } finally {
      setLoading(false);
    }
  };




 const uploadFiles = async (files: File[], studentId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await uploadFilesApi(files, studentId); // Pass studentId to the API function

      if (result.success) {
        // Handle successful upload response if needed
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    response,
    sendStudentData,
    uploadFiles, // Export the uploadFiles function
  };
};