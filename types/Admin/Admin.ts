
export interface Login {
    email?: string;
    password?: string;
    token?: string; // Add token here
  }
  

// types/Admin/Admin.ts

export interface SidebarItem {
  text: string;
  hook: (handleSidebarClick: (formName: string) => void) => () => void; // Allowing a parameter
  children?: SidebarItem[]; // Make children optional and of type SidebarItem array

}

