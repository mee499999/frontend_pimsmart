import { useState } from 'react';
import { Student } from '@/types/Register';
import { ApiResponse } from '@/types/IResponse';
import { apiStudents } from '@/app/api/Admin/ApiStudents';

export const useStudents = (setPaginationModel: unknown) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);

    const fetchStudents = async (offset: number, limit: number) => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponse<Student[]> = await apiStudents.fetchAllStudents(offset, limit);
            if (response.success) {
                const retrievedStudents = response.data || []; // Access the students array
                console.log('Fetched students:', retrievedStudents);
                setStudents(retrievedStudents);
                setTotalCount(response.totalCount); // Set the totalCount based on API response
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError('Failed to fetch student data.');
        } finally {
            setLoading(false);
        }
    };

    return { students, loading, error, totalCount, fetchStudents };
};
