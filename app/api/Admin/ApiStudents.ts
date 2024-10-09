import { Student } from '@/types/Register';
import { ApiResponseS } from '@/types/IResponse';
import axiosAdmin from '@/utils/axiosAdmin';

export const apiStudents = {
  fetchAllStudents: async (offset: number, limit: number): Promise<ApiResponseS<Student[]>> => {
    try {
      const response = await axiosAdmin.get<ApiResponseS<Student[]>>(`/All`, {
        params: { offset, limit }, // Use the parameters directly here
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching students.',
        data: null,
        totalCount: 0, 
        error: error instanceof Error ? error.message : 'An unknown error occurred.', // Improved error handling
      };
    }
  },

};
