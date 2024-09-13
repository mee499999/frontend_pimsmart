


export interface IResponse<T>{
    success: boolean;
    message: string;
    data: T | null;
    error: string | null;
  
}



// In '@/types/IResponse.ts'
export interface User {
    id: number; // Adjust the type based on your API response
    username: string;
    email: string;
    createdIn: string; // Adjust based on the actual data type, e.g., ISO date string
  }


  

  export interface Student {
    id?: number;
    studentId?: string;
    firstName?: string;
    lastName?: string;
    nickname?: string;
    dateOfBirth?: string; // ISO 8601 date string
    gender?: string;
    email?: string;
    phoneNumber?: string;
    faculty?: string;
    fieldOfStudy?: string;
    currentlyStudyingYear?: string;
    createDate?: string; // ISO 8601 date-time string
    studentType?: string;
    prefix?: string;
    congenitalDisease?: string;
    block?: string;
    currentGpa?: string; // Can be a string if dealing with BigDecimal
    nationalId?: string;

    request? : string;

    current_address: string;
    current_postal_code: string;
    current_province: string;
    current_district: string;
    current_subdistrict: string;
    address_according_to_house_registration: string;
    postal_code: string;
    province: string;
    district: string;
    subdistrict: string;
    create_date: string; // You might want to use `Date` if this is a date
    first_name: string;

    
}

export interface Location {
  province: string;
  district: string;
  subdistrict: string;
  zipcode: string;
}

export interface FormValues {
  studentId: string;
  firstName: string;
  activityName: string;
  organizationName: string;
  organizationPhone: string;
  activityDescription: string;
  activityDate: string;
  hours: string;
  createDate: string;
}

export interface VolunteerHoursResponse {
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

export interface VolunteerFormProps {
  onSubmit: (formValues: any) => void;
  formValues: any;
  setFormValues: React.Dispatch<React.SetStateAction<any>>;
  success: string | null;
  error: string | null;
  loading: boolean;
}

