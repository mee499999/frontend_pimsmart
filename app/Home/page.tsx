// app/page.tsx
"use client";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { getUser } from '../api/test';
import { User } from '@/types/IResponse';
import Table from '@/components/Table';

const HomePage: React.FC = () => {
const [users, setUsers] = useState<User[]>([]);


const handleButtonClick = async () => {
    try {
      const response = await getUser(); // เรียก getUser เพื่อดึงข้อมูล
      setUsers(response); // ตั้งค่า State
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const headers = ['ID', 'Username', 'Email', 'Created In'];
  const data = users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    created_in: new Date(user.created_in).toLocaleString()
  }));


  return (
    <Layout>
      <h1>Welcome to the Home Page</h1>
      <p>This is where your page content will go.</p>

      <main>
        <h1>Welcome to My Page</h1>
        <p>This is a sample page created with TypeScript and React.</p>

        {users.length > 0 ? (
          <Table headers={headers} data={data} />
        ) : (
          <p>No user data available</p>
        )}

        <button onClick={handleButtonClick}>Fetch User Data</button>
      </main>
    </Layout>
  );
};

export default HomePage;
