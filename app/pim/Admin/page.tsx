// page.tsx
"use client";

import React, { useState } from 'react';
import LayoutAdmin from '../components/LayoutAdmin';
import Dashboard from './Dashboard/Dashboard';
import Studenthistory from './Studenthistory/Studenthistory';
import Studentvolunteer from './StudentVolunteer/Studentolunteer';




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
        {
          text: 'จิตอาสานักศึกษา',
          hook: () => handleSidebarClick('Studentvolunteer'),
        },
      ]}
    >
      <main>
        {selectedForm === 'dashboard' && <Dashboard />} 
        {selectedForm === 'Studenthistory' && <Studenthistory />} 
        {selectedForm === 'Studentvolunteer' && <Studentvolunteer />} 

      </main>
      
    </LayoutAdmin>
  );
};

export default Page;
