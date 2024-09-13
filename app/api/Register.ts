import { Student } from "@/types/IResponse";
import axiosApi from "@/utils/Api";

export const Register = async (studentId: string, fullName: string): Promise<Student[]> => {
    try {
        const url = `students/search?studentId=${encodeURIComponent(studentId)}&firstName=${encodeURIComponent(fullName)}`;
        const response = await axiosApi.get<Student[]>(url);
        return response.data; // Return the full response data
    } catch (error) {
        console.error('Error fetching student data:', error);
        throw error;
    }
};
