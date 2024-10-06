import React from 'react';
import DataTable from '@/components/Table'; // ตรวจสอบให้แน่ใจว่าคุณมีคอมโพเนนต์นี้
import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'ชื่อ', width: 150 },
  { field: 'faculty', headerName: 'คณะ', width: 150 },
  { field: 'hours', headerName: 'จำนวนชั่วโมงจิตอาสา', width: 180 },
  { field: 'activity', headerName: 'ชื่อกิจกรรม', width: 200 },
  { field: 'date', headerName: 'วันที่ทำกิจกรรม', width: 150 },
];

const rows = [
  { id: 1, name: 'John Doe', faculty: 'Engineering', hours: 10, activity: 'ทำความสะอาดชุมชน', date: '2024-09-10' },
  { id: 2, name: 'Jane Smith', faculty: 'Science', hours: 8, activity: 'สอนหนังสือเด็ก', date: '2024-09-12' },
  { id: 3, name: 'Robert Brown', faculty: 'Arts', hours: 12, activity: 'แจกอาหารในชุมชน', date: '2024-09-15' },
];

const Studentvolunteer: React.FC = () => {
  return (
    <main>
      <h1>จิตอาสานักศึกษา</h1>
      <DataTable
        rows={rows} // ส่งข้อมูล mock ของนักศึกษา
        initialColumns={columns} // ใช้ initialColumns ตามที่ต้องการ
      />
    </main>
  );
};

export default Studentvolunteer;
