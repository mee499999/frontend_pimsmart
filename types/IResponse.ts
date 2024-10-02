
export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: string | null;

}

// Define the response type for the backend
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null; // ใช้ประเภทเจนเนอริกที่นี่
  error?: string;
  token?: string; // Add token to the ApiResponse type

}








export interface ErrorResponse {
  message?: string;
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
  uploadVolunteer?: FileList | File[];
  prefix?: string;
  studentId?: string;
  firstName?: string;
  nickname?: string;
  graduate?: string;
  branch?: string;
  activityName?: string;
  organizationName?: string;
  organizationPhone?: string;
  activityDescription?: string;
  activityDate?: string;
  hours?: number ;


 
}

export interface FormValuesWork {
  studentId?: string;               // Student ID
  prefix?: string;                  // Prefix (Mr., Ms., Dr., etc.)
  firstName?: string;               // Full name of the student
  nickname?: string;                // Nickname of the student
  graduate?: string;                // Graduation year or status
  branch?: string;                  // Branch of study
  workName?: string;                // Activity/Work Name
  organizationName?: string;        // Organization Name
  organizationPhone?: string;      // Organization Phone Number
  workDescription?: string; 
  activityDate?: string; 
  hours?: number;                   // Number of hours spent on activity
  workType?: string; 
  compensation?: number; 
  workDates?: string; 
  workTime?: string; 
  
  uploadSpecialwork?: FileList | File[]; // File(s) for special work upload
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

export interface State {
  selectedForm: string;
  formValues: FormValues;
  success: string | null;
  error: string | null;
  loading: boolean;
  volunteerHours: number | null;
}
