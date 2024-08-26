// page.tsx
"use client";

import React, { useState } from 'react';
import { getUser } from '../api/test';
import { User } from '@/types/IResponse';

const Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleButtonClick = async () => {
    try {
      const response = await getUser(); // เรียก getUser เพื่อดึงข้อมูล
      setUsers(response); // ตั้งค่า State
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to My Page</h1>
      <p>This is a sample page created with TypeScript and React.</p>

      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Created In</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_in).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user data available</p>
      )}

      <button onClick={handleButtonClick}>Fetch User Data</button>

      <style jsx>{`
        .user-table {
          width: 100%;
          border-collapse: collapse;
        }
        .user-table th, .user-table td {
          padding: 8px;
          text-align: left;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
};

export default Page;
