"use client";

import React, { useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { FormName, useSidebarNavigation } from '../../components/sidebarItems';
import { usePathname } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataAdminTable from '../../components/DataAdminTable';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AdminTabCards from './RegisterComponents/CustomTabCards';
import { FormProvider, useForm } from 'react-hook-form';
import { Student } from '@/types/Register';

const Register: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<FormName>('Register');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { handleSidebarClick, renderSidebarItems } = useSidebarNavigation(setSelectedForm, setExpandedItems);
  
  const formAdmin = useForm<Student>(); // ใช้ react-hook-form สำหรับการจัดการฟอร์ม
  const [open, setOpen] = useState(false); // สถานะสำหรับการเปิดปิด Dialog

  const handleCreateStudent = () => {
    setOpen(true); // เปิด Dialog สำหรับสร้างนักเรียนใหม่
  };

  const handleClose = () => {
    setOpen(false); // ปิด Dialog
    formAdmin.reset(); // รีเซ็ตฟอร์ม
  };

  const handleSubmit = async (data: Student) => {
    try {
      console.log('Submitting student data:', data);
      // TODO: Implement your API call here to create a student
      handleClose(); // ปิด Dialog หลังจากส่งข้อมูล
    } catch (error) {
      console.error('Error creating student:', error); // แสดงข้อผิดพลาดหากเกิดขึ้น
    }
  };

  return (
    <LayoutAdmin
      contentTitle="Register"
      sidebarItems={renderSidebarItems} // ส่ง sidebarItems ที่เราสร้างขึ้น
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
        <DataAdminTable rows={[]} initialColumns={[]} /> {/* ข้อมูลตารางนักเรียน */}

        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>Create New Student</DialogTitle>
          <DialogContent>
            <FormProvider {...formAdmin}>
              <AdminTabCards formAdmin={formAdmin} /> {/* ฟอร์มสำหรับเพิ่มข้อมูลนักเรียน */}
            </FormProvider>
          </DialogContent>
        </Dialog>
      </main>
    </LayoutAdmin>
  );
};

export default Register;
