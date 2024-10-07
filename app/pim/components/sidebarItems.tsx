import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export type FormName =
  | 'dashboard'
  | 'Studenthistory'
  | 'Register'
  | 'conditionsNotMet'
  | 'CheckStatusPassed'
  | 'Volunteer'
  | 'contract';

export interface SimpleSidebarItem {
  text: string;
  hook: () => void;
  id: string; // Add id here
}

export interface SidebarItemWithChildren extends SidebarItem {
  link?: string; // Optional link
  children?: SidebarItemWithChildren[];
  isExpanded?: boolean;
}

export interface SidebarItem {
  text: string;
  id: string; // Add id here
  hook: (handleSidebarClick: (formName: FormName) => void) => () => void;
}

export const sidebarItems: SidebarItemWithChildren[] = [
  {
    id: 'dashboard',
    text: 'dashboard',
    hook: (handleSidebarClick) => () => handleSidebarClick('dashboard'),
  },
  {
    id: 'Studenthistory',
    text: 'ประวัตินักศึกษา',
    hook: (handleSidebarClick) => () => handleSidebarClick('Studenthistory'),
  },
  {
    id: 'Register',
    text: 'สมัคร',
    hook: (handleSidebarClick) => () => handleSidebarClick('Register'),
    children: [
      {
        id: 'conditionsNotMet',
        text: 'เอกสารไม่ผ่านเงื่อนไข',
        hook: (handleSidebarClick) => () => handleSidebarClick('conditionsNotMet'),
      },
      {
        id: 'CheckStatusPassed',
        text: 'ข้อมูลสถานะนศที่ผ่านแล้ว',
        hook: (handleSidebarClick) => () => handleSidebarClick('CheckStatusPassed'),
      },
    ],
  },
  {
    id: 'Volunteer',
    text: 'จิตอาสา',
    hook: (handleSidebarClick) => () => handleSidebarClick('Volunteer'),
  },
  {
    id: 'contract',
    text: 'ต่อทุน',
    hook: (handleSidebarClick) => () => handleSidebarClick('contract'),
  },
];

export const useSidebarNavigation = (
  setSelectedForm: React.Dispatch<React.SetStateAction<FormName>>,
  setExpandedItems: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const router = useRouter();

  const links: Record<FormName, string | undefined> = {
    dashboard: '/pim/Admin',
    Studenthistory: '/pim/Admin/Studenthistory',
    Register: '/pim/Admin/Register',
    conditionsNotMet: '/pim/Admin/Register/conditionsNotMet',
    CheckStatusPassed: '/pim/Admin/Register/CheckStatusPassed',
    Volunteer: '/pim/Admin/StudentVolunteer',
    contract: '/pim/Admin/contract',
  };

  const handleSidebarClick = useCallback((formName: FormName) => {
    console.log('Clicked:', formName);
    setSelectedForm(formName);

    setExpandedItems((prev) => {
      if (prev.includes(formName)) {
        return prev.filter(item => item !== formName); // Collapse if clicked again
      } else {
        return [...prev, formName]; // Expand if clicked for the first time
      }
    });

    const destination = links[formName];
    if (destination) {
      console.log('Navigating to:', destination);
      router.push(destination);
    } else {
      console.warn('Unknown form name:', formName);
    }
  }, [setSelectedForm, setExpandedItems, router]);

  const renderSidebarItems = useMemo(() => {
    const renderItems = (items: SidebarItemWithChildren[]): SimpleSidebarItem[] => {
      return items.flatMap(item => {
        const simplifiedItem: SimpleSidebarItem = {
          text: item.text,
          hook: () => item.hook(handleSidebarClick)(),
          id: item.id // Ensure id is included
        };

        if (item.children) {
          return [
            simplifiedItem,
            ...renderItems(item.children).map(childItem => ({
              ...childItem,
              text: `  ${childItem.text}`, // Add indentation for child items
            })),
          ];
        }

        return [simplifiedItem];
      });
    };

    return renderItems(sidebarItems);
  }, [handleSidebarClick]);

  return { handleSidebarClick, renderSidebarItems };
};
