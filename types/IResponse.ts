


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
}

  