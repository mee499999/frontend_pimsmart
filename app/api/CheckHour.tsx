import axiosApi from '@/utils/Api'; // Ensure axiosApi is configured

interface VolunteerHoursResponse {
  hours: number; // Adjust according to the actual response structure
}

// Function to fetch volunteer hours
export const fetchVolunteerHours = async (studentId: string): Promise<VolunteerHoursResponse> => {
  try {
    const response = await axiosApi.get<VolunteerHoursResponse>(`/volunteer-activities/${studentId}`);
    return response.data; // Return the data from the API response
  } catch (error) {
    throw new Error('Error fetching volunteer hours');
  }
};
