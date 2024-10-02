import axiosApi from "@/utils/Api";

export interface RankinResponse {
  studentId: string;
  totalHours: number;
  rank: number;
}

export const fetchRankinActivity = async (): Promise<RankinResponse[] | null> => {
  try {
    // Use axiosApi to make a GET request
    const response = await axiosApi.get<RankinResponse[]>('/rankin/activity', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Since axios already parses the JSON response, just return the data directly
    return response.data;
  } catch (error) {
    console.error('Error fetching ranking data:', error);
    return null;
  }
};
