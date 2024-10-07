"use client";
import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { FormName, useSidebarNavigation } from '../../components/sidebarItems';
import { usePathname } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataAdminTable from '../../components/DataAdminTable';
import { Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Snackbar } from '@mui/material';
import AdminTabCards from './RegisterComponents/CustomTabCards';
import { FormProvider, useForm } from 'react-hook-form';
import { Student } from '@/types/Register';
import { useStudents } from '@/hooks/Admin/useStudents';

const initialColumns = [
  { field: 'studentId', headerName: 'Student ID', width: 150 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'faculty', headerName: 'Faculty', width: 150 },
  { field: 'status', headerName: 'Status', width: 100 },
  // Add more columns as needed
];

const Register: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<FormName>('Register');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { handleSidebarClick, renderSidebarItems } = useSidebarNavigation(setSelectedForm, setExpandedItems);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const { students, loading, error, fetchStudents } = useStudents(setPaginationModel);

  const formAdmin = useForm<Student>();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCreateStudent = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formAdmin.reset();
  };

  const handlePaginationModelChange = (model: { page: number; pageSize: number }) => {
    setPaginationModel(model);
  };

  useEffect(() => {
    fetchStudents(paginationModel.page, paginationModel.pageSize); // Fetch students on mount and when pagination changes
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    console.log('Fetched students:', students); // Log students after fetching
  }, [students]);

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
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange} // Pass the function
          />
        )}

        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>Create New Student</DialogTitle>
          <DialogContent>
            <FormProvider {...formAdmin}>
              <AdminTabCards formAdmin={formAdmin} />
            </FormProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Implement form submission logic here
              }}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
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
