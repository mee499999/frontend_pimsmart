// hooks/RegisterH.ts
import { useState } from 'react';
import { Student } from '@/types/Register';
import {   uploadVolunteerFilesApi } from '@/app/api/Volunteer';
import { uploadFilesWorkApi } from '@/app/api/SpecialWork';

// Define the response type for the backend
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}



  export const useuploadSpecialWorkApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<ApiResponse | null>(null);



    const uploadSpecialWork = async (
      files: File[],
      studentId: string,
      firstName: string,
      imageType: string
    ) => {
      setLoading(true);
      setError(null);
    
      try {
        const fileNames = files.map(file => file.name);
        const result = await uploadFilesWorkApi(files, studentId, firstName, fileNames, imageType);
    
        if (!result.success) {
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
      uploadSpecialWork
      };
  };
