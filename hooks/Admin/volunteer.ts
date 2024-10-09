import { useState } from 'react';
import { ApiResponse } from '@/types/IResponse';
import { ApiAllVolunteer } from '@/app/api/Admin/Volunteer';
import { FormValues } from '@/types/Volunteer';



export const volunteer = (setPaginationModel: unknown) => {
    const [students, setStudents] = useState<FormValues[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);

    const fetchvolunteer = async (offset: number, limit: number) => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponse<FormValues[]> = await ApiAllVolunteer.fetchAllVolunteer(offset, limit);
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

    return { students, loading, error, totalCount, fetchvolunteer };
};
