// page.tsx
"use client";

import React, { useState } from 'react';
import LayoutAdmin from '../components/LayoutAdmin';
import Dashboard from './components/Dashboard';

const Page: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('dashboard'); // Manage the selected form

  const handleSidebarClick = (formName: string) => {
    setSelectedForm(formName); // Update the selected form when a sidebar item is clicked
  };

  return (
    <LayoutAdmin
      contentTitle="ADMIN"
      sidebarItems={[
        {
          text: 'dashboard',
          hook: () => handleSidebarClick('dashboard'),
        },
        {
          text: 'ประวัตินักศึกษา',
          hook: () => handleSidebarClick('Studenthistory'),
        },
      ]}
    >
      <main>
        {selectedForm === 'dashboard' && <Dashboard />} {/* Render the Dashboard */}
        {/* Add conditional rendering for other components here */}
      </main>
      
    </LayoutAdmin>
  );
};

export default Page;
