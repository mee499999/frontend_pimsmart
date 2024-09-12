import axiosApi from '@/utils/Api'; // Ensure axiosApi is configured

interface VolunteerHoursResponse {
  studentId: string;
  firstName: string;
  activityName: string;
  organizationName: string;
  organizationPhone: string;
  activityDescription: string;
  activityDate: string;
  hours: number;
  createDate: string;
}

// Function to fetch volunteer hours
export const fetchVolunteerHours = async (studentId: string): Promise<VolunteerHoursResponse> => {
  try {
    const response = await axiosApi.get<VolunteerHoursResponse>(`/volunteer-activities/student/${studentId}`);
    return response.data; // Return the data from the API response
  } catch (error) {
    throw new Error('Error fetching volunteer hours');
  }
};
