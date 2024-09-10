"use client";

import React from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import pimHomeImage from '@/public/Large.png';

const Page: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-full min-w-[auto]"> {/* กำหนดขนาดของ container */}
          {/* ภาพที่ต้องการเบลอ */}
          <Image
            src={pimHomeImage}
            alt="Pim Home image description"
            layout="responsive" // ใช้เพื่อให้ภาพตอบสนองตามขนาด container
            width={1800}
            height={600}

          />
        </div>
      </div>

      <h1>PIMSMART คืออะไร</h1>
    </Layout>
  );
};

export default Page;
