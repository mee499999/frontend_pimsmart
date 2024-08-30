"use client";
import Layout from '@/components/Layout';
import { User } from '@/types/IResponse';
import React, { useState } from 'react';
import { getUser } from '../api/test';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'createdIn', headerName: 'CreatedIn', width: 180 },
];

const MyPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const handleButtonClick = async () => {
      try {
        const response = await getUser(); // Fetch user data
        setUsers(response); // Update state with user data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const rows = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdIn: new Date(user.createdIn).toLocaleString()
    }));

    return (
      <Layout
        contentTitle="My Custom Page Title"
        sidebarItems={[
          { text: 'สมัคร ', link: '/' },
          { text: 'เกี่ยวกับเรา', link: '/about' },
          { text: 'ติดต่อเรา', link: '/contact' },
          { text: 'บริการ', link: '/services' }
        ]}
      >
        <div>Page Content</div>
        <main>
          <h1>Welcome to My Page</h1>
          <p>This is a sample page created with TypeScript and React.</p>

          {users.length > 0 ? (
            <Paper sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                sx={{ border: 0 }}
              />
            </Paper>
          ) : (
            <p>No user data available</p>
          )}

          <button onClick={handleButtonClick}>Fetch User Data</button>
        </main>
      </Layout>
    );
};

export default MyPage;
