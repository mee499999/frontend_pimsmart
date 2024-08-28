// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import '../app/globals.css'; // นำเข้าไฟล์ CSS ทั่วไป

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navList">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        {/* เพิ่มลิงค์อื่นๆ ที่ต้องการ */}
      </ul>
    </nav>
  );
};

export default Navbar;
