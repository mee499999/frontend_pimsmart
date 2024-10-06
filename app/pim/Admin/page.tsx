"use client";

import React, { useState } from 'react';
import LayoutAdmin from '../components/LayoutAdmin';
import Dashboard from './Dashboard/Dashboard';
import Register from './Register/RegisterComponents/Register';
import { FormName, sidebarItems, SidebarItemWithChildren, useSidebarNavigation } from '../components/sidebarItems';



const Page: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<FormName>('dashboard');

  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { handleSidebarClick, renderSidebarItems } = useSidebarNavigation(setSelectedForm, setExpandedItems);




  return (
    <LayoutAdmin
      contentTitle="ADMIN"
      sidebarItems={renderSidebarItems} // ส่ง sidebarItems ที่เราสร้างขึ้น
    >
      <main>
        {selectedForm === 'dashboard' && <Dashboard />}
      </main>
    </LayoutAdmin>
  );
};

export default Page;
