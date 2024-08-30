// components/Content.tsx
import React from 'react';

interface ContentProps {
  title: string; // title เป็น prop ที่จำเป็น
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default Content;
