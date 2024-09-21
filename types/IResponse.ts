
export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: string | null;

}

// Define the response type for the backend
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}


export interface UploadFilesResult {
  success: boolean;
  message?: string;
}


// In '@/types/IResponse.ts'
export interface User {
  id: number; // Adjust the type based on your API response
  username: string;
  email: string;
  createdIn: string; // Adjust based on the actual data type, e.g., ISO date string
}





export interface FormValues {
  studentId?: string;
  studentId1?: string; // Additional field used for the form
  title?: string;
  firstName?: string;
  nickname?: string;
  graduate?: string;
  branch?: string;
  activityName?: string;
  organizationName?: string;
  organizationPhone?: string;
  activityDescription?: string;
  activityDate?: string;
  hours?: string;
  createDate?: string;
  loanStatus?: string;
  yearLevel?: string; 
  formdata?: string; // Optional
  student_id?: string;
  full_name?: string;
  activity_name?: string;
  organization_name?: string;
  organization_phone?: string;
  activity_description?: string;
  activity_date?: string;
  
  activity_image?: File;
}

// Response structure when fetching volunteer hours
export interface VolunteerHoursResponse {
  id: string;
  studentId: string;
  firstName: string;
  activityName: string;
  organizationName: string;
  organizationPhone: string;
  activityDescription: string;
  activityDate: string;
  hours: number;
  
}

// Props for the VolunteerForm component
export interface VolunteerFormProps {
  onSubmit: (formValues: FormValues) => Promise<void>;
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  success: string | null;
  error: string | null;
  loading: boolean;
  setError: (error: string | null) => void; // Function to set error message
  setLoading: (loading: boolean) => void;   // Function to set loading state
  setSuccessMessage: (message: string | null) => void; // Function to set success message
}

// Props for the SpecialWorkForm component
export interface SpecialWorkFormProps {
  onSubmit: (formValues: SpecialWorkFormData) => void;
  formValues: SpecialWorkFormData;
  setFormValues: React.Dispatch<React.SetStateAction<SpecialWorkFormData>>;
  success: string | null;
  error: string | null;
  loading: boolean;
}

// Data structure for special work form submissions
export interface SpecialWorkFormData {
  studentId: string;
  title: string;
  firstName: string;
  nickname: string;
  graduate: string;
  branch: string;
  activityName: string;
  organizationName: string;
  organizationPhone: string;
  activityDescription: string;
  activityDate: string;
  hours: string;
  createDate: string;
  yearLevel: string;
  loanStatus: string;
}