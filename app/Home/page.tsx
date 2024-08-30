// page.tsx
"use client";

import React, { useState } from 'react';
import { getUser } from '../api/test';
import { User } from '@/types/IResponse';
import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import Layout from '@/components/Layout';

const Page: React.FC = () => {

  return (
    <Layout contentTitle="My Custom Page Title">
      <h1>Hello</h1>


    </Layout>
   
   
    
  );
};

export default Page;
