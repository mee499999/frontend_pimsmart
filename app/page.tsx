"use client";

import React from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import pimHomeImage from '@/public/pimHome.jpg';

const Page: React.FC = () => {
  return (
    <Layout >
      <div className="flex justify-center items-center h-screen">
        <Image src={pimHomeImage} alt="Pim Home image description" width={1800} height={600} />
      </div>

    </Layout>
  );
};

export default Page;
