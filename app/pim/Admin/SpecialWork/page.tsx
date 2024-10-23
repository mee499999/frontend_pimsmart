"use client";

import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { FormName, useSidebarNavigation } from '../../components/sidebarItems';
import { usePathname } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataAdminTable from '../../components/DataAdminTable';
import { Dialog, DialogContent, DialogTitle, CircularProgress, Snackbar, IconButton } from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';
import { specialWork } from '@/hooks/Admin/specialWork';


import { FormValuesWork } from '@/types/IResponse';

import EditIcon from '@mui/icons-material/Edit';
import EditeSpecialWork from '@/app/Volunteer/admin/editeSpecialwaork';

interface PaginationModel {
  page: number;
  pageSize: number;
  
}

const SpecialWork: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<FormName>('SpecialWork');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { handleSidebarClick, renderSidebarItems } = useSidebarNavigation(setSelectedForm, setExpandedItems);
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({ page: 0, pageSize: 5 });
  const { SpecialWork, loading, error, totalCount, fetchSpecialWork } = specialWork(setPaginationModel);
  const formwork = useForm<FormValuesWork>(); // Renamed to avoid conflict with component name
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedSpecialWork, setSelectedSpecialWork] = useState<FormValuesWork | null>(null); // Corrected useState
  const { setValue, getValues } = formwork;

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
    { field: 'workName', headerName: 'ตำแหน่งงาน', width: 200 },
    { field: 'organizationName', headerName: 'ชื่อองค์กร', width: 250 },
    { field: 'organizationPhone', headerName: 'เบอร์โทร', width: 150 },
    { field: 'workDescription', headerName: 'รายละเอียดงานพิเศษ', width: 300 },
    { field: 'activityDate', headerName: 'วันที่ทำกิจกรรม', width: 150 },
    { field: 'hours', headerName: 'จำนวนชั่วโมง', width: 100 },
    { field: 'createDate', headerName: 'วันที่ส่ง จิตอาสา', width: 150 }, 
  ];

  const handleCreateSpecialWork = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formwork.reset(); // Reset form values
  };

  const handlePaginationModelChange = (newModel: PaginationModel) => {
    console.log('Pagination changed:', newModel);
    setPaginationModel(newModel);
  };

  const handleEdit = (rowData: FormValuesWork) => {
    console.log('Edit action for row:', rowData);

    // Set selected special work data
    setSelectedSpecialWork(rowData);

    // Set form values using a loop
    Object.keys(rowData).forEach((key) => {
      setValue(key as keyof FormValuesWork, rowData[key as keyof FormValuesWork]);
    });

    setOpen(true); // Open the dialog
  };

  useEffect(() => {
    console.log('Fetching data:', paginationModel);
    fetchSpecialWork(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    console.log('Data:', SpecialWork);
    console.log('Total count:', totalCount);
  }, [SpecialWork, totalCount]);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  return (
    <LayoutAdmin contentTitle="บัยทึกการทำงานพิเศษ" sidebarItems={renderSidebarItems}>
      <main>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" onClick={handleCreateSpecialWork}>
            Create
          </Button>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          <DataAdminTable
            rows={SpecialWork}
            initialColumns={initialColumns}
            rowCount={totalCount}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
          />
        )}

        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>{selectedSpecialWork ? 'แก้ไข' : 'เพิ่มบันทึก'}</DialogTitle>

          <DialogContent>
            <FormProvider {...formwork}>
              <EditeSpecialWork formwork={formwork} />
            </FormProvider>
          </DialogContent>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={error || 'An error occurred!'}
          autoHideDuration={6000}
        />
      </main>
    </LayoutAdmin>
  );
};

export default SpecialWork;
