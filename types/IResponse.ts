


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
  
  