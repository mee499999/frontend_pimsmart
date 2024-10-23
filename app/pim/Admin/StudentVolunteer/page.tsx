"use client";

import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { FormName, useSidebarNavigation } from '../../components/sidebarItems';
import { usePathname } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataAdminTable from '../../components/DataAdminTable';
import { Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Snackbar, IconButton } from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';


import { volunteer } from '@/hooks/Admin/volunteer';




import EditIcon from '@mui/icons-material/Edit';
import EditeVolunteer from '@/app/Volunteer/admin/editeVoluteer';
import { FormValues } from '@/types/Volunteer';







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
  const [selectedVolunteer, setSelectedVolunteer] = useState<FormValues | null>(null);
  const { setValue, getValues } = formValunteer; 


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
    { field: 'studentId', headerName: 'รหัสรักศึกษา', width: 150 },
    { field: 'prefix', headerName: 'คำนำหน้า', width: 150 },
    { field: 'firstName', headerName: 'ชื่อ - นามสกุล', width: 200 },
    { field: 'nickname', headerName: 'ชื่อเล่น', width: 200 },
    { field: 'branch', headerName: 'สาขา', width: 200 },
    { field: 'graduate', headerName: 'ชั้นปี', width: 200 },
    { field: 'activityName', headerName: 'ชื่อกิจกรรมจิตอาสา', width: 200 },
    { field: 'organizationName', headerName: 'ชื่อองค์กร', width: 250 },
    { field: 'organizationPhone', headerName: 'เบอร์โทร', width: 150 },
    { field: 'activityDescription', headerName: 'รายละเอียดจิตอาสา', width: 300 },
    { field: 'activityDate', headerName: 'วันที่ทำกิจกรรม', width: 150 },
    { field: 'hours', headerName: 'จำนวนชั่วโมง', width: 100 },
    { field: 'createDate', headerName: 'วันที่ส่ง จิตอาสา', width: 150 }, 
  ];


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

  const handleEdit = (rowData: FormValues) => {
    console.log('Edit action for row:', rowData);
    
    // Set selected student data
    setSelectedVolunteer(rowData);

    // Set form values using a loop
    Object.keys(rowData).forEach((key) => {
      setValue(key as keyof FormValues, rowData[key as keyof FormValues]); // Use key as keyof Student
    });

    setOpen(true); // Open the dialog
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
        <DialogTitle>{selectedVolunteer ? 'แก้ไข' : 'เพิ่มบันทึกจิตอาสา'}</DialogTitle>
         
          <DialogContent>
            <FormProvider {...formValunteer}>
              <EditeVolunteer formValunteer={formValunteer} />
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