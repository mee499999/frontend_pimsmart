"use client";

import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { FormName, useSidebarNavigation } from '../../components/sidebarItems';
import { usePathname } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataAdminTable from '../../components/DataAdminTable';
import { Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Snackbar } from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';
import { Student } from '@/types/Register';

import { volunteer } from '@/hooks/Admin/volunteer';
import AdminTabCards from '../Register/RegisterComponents/CustomTabCards';

const initialColumns = [
  { field: 'studentId', headerName: 'Student ID', width: 150 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'faculty', headerName: 'Faculty', width: 150 },
  { field: 'status', headerName: 'Status', width: 100 },
];

interface PaginationModel {
  page: number;
  pageSize: number;
}

const Volunteer: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<FormName>('Register');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { handleSidebarClick, renderSidebarItems } = useSidebarNavigation(setSelectedForm, setExpandedItems);
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({ page: 1, pageSize: 5 });
  const { students, loading, error, totalCount, fetchvolunteer } = volunteer(setPaginationModel);
  const formAdmin = useForm<Student>();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCreateVolunteer= () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formAdmin.reset();
  };

  const handlePaginationModelChange = (newModel: PaginationModel) => {
    console.log('Pagination changed:', newModel);
    setPaginationModel(newModel);
  };

  useEffect(() => {
    console.log('Fetching students:', paginationModel);
    fetchvolunteer(paginationModel.page, paginationModel.pageSize);
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
            onClick={handleCreateVolunteer}
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
          <DialogTitle>Create New Student</DialogTitle>
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

export default Volunteer;