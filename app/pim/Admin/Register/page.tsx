"use client";

import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { FormName, useSidebarNavigation } from '../../components/sidebarItems';
import { usePathname } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataAdminTable from '../../components/DataAdminTable';
import { Dialog, DialogContent, DialogTitle, CircularProgress, Snackbar, IconButton } from '@mui/material';
import AdminTabCards from './RegisterComponents/AdminTabCards';
import { FormProvider, useForm } from 'react-hook-form';
import { Student } from '@/types/Register';
import { useStudents } from '@/hooks/Admin/useStudents';
import { useStudentImages } from '@/hooks/Admin/useStudentImages';
import EditIcon from '@mui/icons-material/Edit';
import IconPDF from "/public/pdf.png";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Sortable from 'sortablejs';
import Frompdf from './RegisterComponents/Frompdf';

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
  const { students, loading: loadingStudents, error: studentError, totalCount, fetchStudents } = useStudents(setPaginationModel);
  const { loading: loadingImages, fetchStudentImages } = useStudentImages();
  const formMethods = useForm<Student>();
  const { setValue } = formMethods;
  const [openEditDialog, setOpenEditDialog] = useState(false); // For edit/create student
  const [openPdfDialog, setOpenPdfDialog] = useState(false); // For PDF view
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const initialColumns = [
    {
      field: 'actions',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: { row: any }) => (
        <IconButton onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'openPdf',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: { row: any }) => (
        <IconButton onClick={() => handleOpenPdf(params.row)}>
          <img src={IconPDF.src} alt="PDF Icon" style={{ width: 24, height: 24 }} />
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
    setOpenEditDialog(true);
    formMethods.reset();
  };

  const handleEdit = (rowData: Student) => {
    console.log('Edit action for row:', rowData);
    setSelectedStudent(rowData);
    Object.keys(rowData).forEach((key) => {
      setValue(key as keyof Student, rowData[key as keyof Student]);
    });
    setOpenEditDialog(true);
  };

  const handleOpenPdf = (rowData: Student) => {
    console.log('Opening PDF for student:', rowData);
    setSelectedStudent(rowData);
    Object.keys(rowData).forEach((key) => {
      setValue(key as keyof Student, rowData[key as keyof Student]);
    });
    setOpenPdfDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    formMethods.reset();
  };

  const handleClosePdfDialog = () => {
    setOpenPdfDialog(false);
  };

  const handlePaginationModelChange = (newModel: PaginationModel) => {
    setPaginationModel(newModel);
  };

  useEffect(() => {
    fetchStudents(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (studentError) {
      setSnackbarOpen(true);
    }
  }, [studentError]);

  return (
    <LayoutAdmin contentTitle="Register" sidebarItems={renderSidebarItems}>
      <main>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" onClick={handleCreateStudent}>
            Create
          </Button>
        </Box>

        {loadingStudents ? (
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

        {/* Edit/Create Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="lg" fullWidth>
          <DialogTitle>{selectedStudent ? 'Edit Student' : 'Create New Student'}</DialogTitle>
          <DialogContent>
            <FormProvider {...formMethods}>
              <AdminTabCards formMethods={formMethods} />
            </FormProvider>
          </DialogContent>
        </Dialog>

        {/* PDF View Dialog */}
        <Dialog
          open={openPdfDialog}
          onClose={handleClosePdfDialog}
          maxWidth={false} // Disable default maxWidth settings
          PaperProps={{
            style: {
              width: '210mm', // A4 width
              height: '297mm', // A4 height
              maxWidth: '210mm',
              // maxHeight: '297mm',
              margin: 'auto',  // Center the dialog
              top: 50,         // Provide top space
            },
          }}
        >
          <DialogTitle>PDF View</DialogTitle>
          <DialogContent>
            <FormProvider {...formMethods}>
              <Frompdf formMethods={formMethods} />
            </FormProvider>
          </DialogContent>
        </Dialog>


        <Snackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={studentError || "An error occurred!"}
          autoHideDuration={6000}
        />
      </main>
    </LayoutAdmin>
  );
};

export default Register;
