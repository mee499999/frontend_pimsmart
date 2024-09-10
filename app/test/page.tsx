"use client";
import Layout from '@/components/Layout';
import { User } from '@/types/IResponse';
import React, { useRef, useState, useEffect } from 'react';
import { getUser } from '../api/test';
import DataTable from '@/components/Table';
import { GridColDef } from '@mui/x-data-grid';
import Loading from '@/components/Loading';
import { Box } from '@mui/material';

const MyPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // เพิ่มสถานะสำหรับการโหลด
  const tableRef = useRef<HTMLDivElement>(null); // สร้าง ref สำหรับตาราง

  useEffect(() => {
    // เรียกใช้งาน fetch ข้อมูลเมื่อคอมโพเนนต์โหลด
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getUser(); // Fetch user data
        setUsers(response); // Update state with user data
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ใช้ dependency array เป็นค่าว่าง เพื่อให้ fetch ทำงานเพียงครั้งเดียวเมื่อคอมโพเนนต์โหลด

  const rows = users.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    createdIn: new Date(user.createdIn).toLocaleString(),
  }));

  const createColumn = (
    field: string,
    headerName: string,
    width: number,
    extraProps?: Partial<GridColDef<any>>
  ): GridColDef<any> => {
    return {
      field,
      headerName,
      width,
      headerAlign: 'center',
      ...extraProps,
    };
  };

  const columnsuser: (GridColDef<any> & { dataType?: string })[] = [
    createColumn("id", "ID", 175, {
      renderCell: (params) => (
        <div style={{ color: '#0070f3', cursor: 'pointer', textDecoration: 'underline' }}>
          {params.row.id}
        </div>
      ),
    }),
    createColumn("username", "Username", 150),
    createColumn("email", "Email", 200),
    createColumn("createdIn", "Created In", 180),
  ];

  return (
    <Layout
      contentTitle="My Custom Page Title"

    >
      <main>
        <h1>Welcome to My Page</h1>
        <p>This is a sample page created with TypeScript and React.</p>

        <Box position="relative">
          <div ref={tableRef}>
            {/* แสดงคอมโพเนนต์ Loading ขณะรอข้อมูล */}
            <Loading open={loading} containerRef={tableRef} />
            <DataTable rows={rows} columns={columnsuser} />
          </div>
        </Box>
      </main>
    </Layout>
  );
};

export default MyPage;
