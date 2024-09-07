// components/FontLinks.tsx
import React from 'react';
import Head from 'next/head';

const FontLinks: React.FC = () => {
  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    </Head>
  );
};

export default FontLinks;
