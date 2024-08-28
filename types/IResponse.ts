


export interface IResponse<T>{
    success: boolean;
    message: string;
    data: T | null;
    error: string | null;
  
}

export interface User {
    id: number;
    username: string;
    email: string;
    created_in: Date;
}

