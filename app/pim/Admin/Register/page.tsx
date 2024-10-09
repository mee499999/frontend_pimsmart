"use client";

import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { FormName, useSidebarNavigation } from '../../components/sidebarItems';
import { usePathname } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataAdminTable from '../../components/DataAdminTable';
import { Dialog, DialogContent, DialogTitle, CircularProgress, Snackbar, IconButton } from '@mui/material';
import AdminTabCards from './RegisterComponents/CustomTabCards';
import { FormProvider, useForm } from 'react-hook-form';
import { Student } from '@/types/Register';
import { useStudents } from '@/hooks/Admin/useStudents';
import EditIcon from '@mui/icons-material/Edit';

interface PaginationModel {
  page: number;
  pageSize: number;
}

const Register: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<FormName>('Register');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { handleSidebarClick, renderSidebarItems } = useSidebarNavigation(setSelectedForm, setExpandedItems);
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({ page: 0, pageSize: 5 });
  const { students, loading, error, totalCount, fetchStudents } = useStudents(setPaginationModel);
  const formAdmin = useForm<Student>();
  const { setValue, getValues } = formAdmin; // Importing setValue and getValues
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null); // State for the selected student

  const initialColumns = [
    {
      field: 'actions',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: { row: any; }) => (
        <IconButton onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    { field: 'studentId', headerName: 'Student ID', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'faculty', headerName: 'Faculty', width: 150 },
    { field: 'status', headerName: 'Status', width: 100 },
  ];

  const handleCreateStudent = () => {
    setOpen(true);
    formAdmin.reset(); // Reset the form for creating a new student
  };

  const handleEdit = (rowData: Student) => {
    console.log('Edit action for row:', rowData);
    
    // Set selected student data
    setSelectedStudent(rowData);

    // Set form values using a loop
    Object.keys(rowData).forEach((key) => {
      setValue(key as keyof Student, rowData[key as keyof Student]); // Use key as keyof Student
    });

    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false);
    formAdmin.reset(); // Reset the form when closing
  };

  const handlePaginationModelChange = (newModel: PaginationModel) => {
    console.log('Pagination changed:', newModel);
    setPaginationModel(newModel);
  };

  const handleSubmit = () => {
    const values = getValues(); // Get current form values
    console.log('Form Values:', values); // Log or use the values as needed
    // Add your submit logic here
  };

  useEffect(() => {
    console.log('Fetching students:', paginationModel);
    fetchStudents(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    console.log('Students data:', students);
    console.log('Total count:', totalCount);
  }, [students, totalCount]);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  return (
    <LayoutAdmin
      contentTitle="Register"
      sidebarItems={renderSidebarItems}
    >
      <main>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateStudent}
          >
            Create
          </Button>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          <DataAdminTable
            rows={students}
            initialColumns={initialColumns}
            rowCount={totalCount}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
          />
        )}

        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>{selectedStudent ? 'Edit Student' : 'Create New Student'}</DialogTitle>
          <DialogContent>
            <FormProvider {...formAdmin}>
              <AdminTabCards formAdmin={formAdmin} />
              
            </FormProvider>
          </DialogContent>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={error || "An error occurred!"}
          autoHideDuration={6000}
        />
      </main>
    </LayoutAdmin>
  );
};

export default Register;
