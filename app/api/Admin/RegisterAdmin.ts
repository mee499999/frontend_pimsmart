import { ApiResponse } from "@/types/IResponse";
import { Student } from "@/types/Register";
import axiosApi from "@/utils/Api";





export const sendStudentAdminDataApi = async (
  studentData: Student,
  endpoint: string = '/Admin/student/register' // กำหนด endpoint ที่นี่
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


export const sendRequestDataApi = async (
  studentData: Student,
  endpoint: string = '/students/request' // กำหนด endpoint ที่นี่
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