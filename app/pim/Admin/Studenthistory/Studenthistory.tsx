import React from 'react';
import DataTable from '@/components/Table';
import { GridColDef } from '@mui/x-data-grid';

// Define your columns and data
const initialColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'faculty', headerName: 'Faculty', width: 150 },
  { field: 'year', headerName: 'Year', width: 110 },
];

const initialData = [
  { id: 1, name: 'John Doe', faculty: 'Engineering', year: '2' },
  { id: 2, name: 'Jane Smith', faculty: 'Science', year: '3' },
  { id: 3, name: 'Robert Brown', faculty: 'Arts', year: '1' },
];

const StudentHistory: React.FC = () => {
  return (
    <DataTable
      rows={initialData} // Pass the mock student data
      initialColumns={initialColumns} // Pass the column structure
    />
  );
};

export default StudentHistory;
