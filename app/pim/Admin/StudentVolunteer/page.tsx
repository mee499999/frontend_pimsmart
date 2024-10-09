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

import VolunteerForm from '@/app/Volunteer/components/VolunteerForm';
import { FormValues } from '@/types/IResponse';

const initialColumns = [
  { field: 'studentId', headerName: 'Student ID', width: 150 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'activityName', headerName: 'Activity Name', width: 200 },
  { field: 'organizationName', headerName: 'Organization Name', width: 250 },
  { field: 'organizationPhone', headerName: 'Organization Phone', width: 150 },
  { field: 'activityDescription', headerName: 'Activity Description', width: 300 },
  { field: 'activityDate', headerName: 'Activity Date', width: 150 },
  { field: 'hours', headerName: 'Hours', width: 100 },
  { field: 'createDate', headerName: 'Create Date', width: 150 },
];


interface PaginationModel {
  page: number;
  pageSize: number;
}

const Volunteer: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<FormName>('Volunteer');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { handleSidebarClick, renderSidebarItems } = useSidebarNavigation(setSelectedForm, setExpandedItems);
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({ page: 0, pageSize: 5 });
  const { Volunteer, loading, error, totalCount, fetchvolunteer } = volunteer(setPaginationModel);
  const formValunteer = useForm<FormValues>();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCreateVolunteer= () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formValunteer.reset();
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
    console.log('Students data:', Volunteer);
    console.log('Total count:', totalCount);
  }, [Volunteer, totalCount]);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  return (
    <LayoutAdmin
      contentTitle="บัยทึกจิตอาสา  "
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
            rows={Volunteer}
            initialColumns={initialColumns}
            rowCount={totalCount}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
          />
        )}

        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>เพิ่มบันทึกจิตอาสา</DialogTitle>
          <DialogContent>
            <FormProvider {...formValunteer}>
              <VolunteerForm formValunteer={formValunteer} />
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