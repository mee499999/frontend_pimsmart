import { useState } from 'react';
import { ApiResponseS } from '@/types/IResponse';
import { FormValues } from '@/types/Volunteer';
import { ApiAllSpecialWork } from '@/app/api/Admin/ApiSpecialWork';



export const specialWork = (setPaginationModel: unknown) => {
    const [SpecialWork, setStudents] = useState<FormValues[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);

    const fetchSpecialWork = async (offset: number, limit: number) => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponseS<FormValues[]> = await ApiAllSpecialWork.fetchAllSpecialWork(offset, limit);
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

    return { SpecialWork, loading, error, totalCount, fetchSpecialWork };
};
