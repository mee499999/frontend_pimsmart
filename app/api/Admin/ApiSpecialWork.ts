
import { ApiResponseS } from '@/types/IResponse';
import { FormValues } from '@/types/Volunteer';
import axiosAdmin from '@/utils/axiosAdmin';

export const ApiAllSpecialWork = {
    fetchAllSpecialWork: async (offset: number, limit: number): Promise<ApiResponseS<FormValues[]>> => {
    try {
      const response = await axiosAdmin.get<ApiResponseS<FormValues[]>>(`/special-work/All`, {
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
