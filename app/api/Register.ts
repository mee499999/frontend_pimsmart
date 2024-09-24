import { ApiResponse } from "@/types/IResponse";
import { Student } from "@/types/Register";
import axiosApi from "@/utils/Api";

import { AxiosError } from 'axios';



export const Register = async (studentId: string, fullName: string): Promise<ApiResponse<Student | null>> => {
  try {
    const url = `students/search?studentId=${encodeURIComponent(studentId)}&firstName=${encodeURIComponent(fullName)}`;
    const response = await axiosApi.get<ApiResponse<Student | null>>(url);
    return response.data; // Return the full response data
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
};







// Function to send student data to backend



export const sendStudentDataApi = async (
  studentData: Student,
  endpoint: string = '/students/register' // กำหนด endpoint ที่นี่
): Promise<ApiResponse<any>> => { // ใช้ any ถ้าข้อมูลที่ส่งคืนไม่แน่นอน
  try {
    const response = await axiosApi.post<ApiResponse<any>>(endpoint, studentData);

    return {
      success: true,
      message: 'Student data sent successfully',
      data: response.data.data,
    };
  } catch (err: any) {
    return { success: false, message: err.response?.data?.message || err.message || 'Network error' };
  }
};




// API function to upload files
export const uploadFilesApi = async (
  files: File[],
  studentId: string,
  firstName: string,
  fileNames: string[],
  imageType: string,
  endpoint: string = '/students/uploadToGoogleDrive'
): Promise<ApiResponse<any>> => { // ใช้ any ถ้าข้อมูลที่ส่งคืนไม่แน่นอน
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });
  formData.append('studentId', studentId);
  formData.append('firstName', firstName);
  fileNames.forEach(name => {
    formData.append('imageName[]', name);
  });
  formData.append('imageType', imageType);

  try {
    const response = await axiosApi.post<ApiResponse<any>>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      message: 'Files uploaded successfully',
      data: response.data.data,
    };
  } catch (err: any) {
    return { success: false, message: err.response?.data?.message || err.message || 'Network error' };
  }
};