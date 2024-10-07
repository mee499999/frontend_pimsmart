"use client";

import React, { useEffect, useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { sidebarItems, useSidebarNavigation, SidebarItemWithChildren, FormName } from '../../components/sidebarItems';
import Dashboard from '../Dashboard/Dashboard';
import { usePathname } from 'next/navigation';



const Page: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<FormName>('dashboard');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { handleSidebarClick, renderSidebarItems } = useSidebarNavigation(setSelectedForm, setExpandedItems);




  return (
    <LayoutAdmin
      contentTitle="StudentVolunteer"
      sidebarItems={renderSidebarItems} // ส่ง sidebarItems ที่เราสร้างขึ้น
    >
      <main>
        {selectedForm === 'dashboard' && <Dashboard />}
        {/* Render additional components based on selectedForm */}
      </main>
    </LayoutAdmin>
  );
};

export default Page;