"use client";

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import LayoutAdmin from '@/app/pim/components/LayoutAdmin';
import { useSidebarNavigation, SidebarItemWithChildren, sidebarItems, FormName } from '@/app/pim/components/sidebarItems';
import Dashboard from '../../Dashboard/Dashboard';

interface SimpleSidebarItem {
  text: string;
  hook: () => void;
}

const Page: React.FC = () => {
    const [selectedForm, setSelectedForm] = useState<FormName>('Register');
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { handleSidebarClick, renderSidebarItems } = useSidebarNavigation(setSelectedForm, setExpandedItems);



  return (
    <LayoutAdmin
      contentTitle="conditionsNotMet"
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