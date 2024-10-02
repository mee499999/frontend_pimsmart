"use client";

import React from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import pimHomeImage from '@/public/Large.png';
import image1 from '@/public/image1.png';
import image2 from '@/public/image2.png';
import image3 from '@/public/image3.png';

// Import the necessary CSS for the slick carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick'; // Import the slider library

const Page: React.FC = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite scroll
    speed: 500,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable auto play
    autoplaySpeed: 3000, // Delay between slides in milliseconds
  };

  return (
    <Layout>
      {/* Background Image Section */}
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-full min-w-[auto]">
          <Image
            src={pimHomeImage}
            alt="Pim Home image description"
            layout="responsive"
            width={1800}
            height={600}
            objectFit="contain" // ไม่ให้ภาพเต็มจอ
          />
        </div>
      </div>

      {/* Text Section */}
      <h1 className="text-center text-xl font-bold mt-8">“พีไอเอ็ม สมาร์ท” กองทุนเพื่อชีวิตฯ ที่ให้มากกว่าทุนการศึกษา</h1>
      <p>
        หนึ่งสิ่งสำคัญในการสร้าง “ความสำเร็จทางการศึกษา” คือ “การมอบโอกาส” เพื่อต่อยอดความฝันให้เยาวชนทุกกลุ่มได้เข้าถึงการศึกษาอย่างเท่าเทียม สิ่งเหล่านี้ถือเป็นมิติสำคัญเพื่อเพิ่มขีดความสามารถทางการแข่งขันให้เยาวชน ได้คำนึงถึงคุณค่าของตัวเองในฐานะบุคลากรของชาติ...
        <a href="https://www.cpall.co.th/news/blog-by-cp-all/">เพิ่มเติม</a>
      </p>

      {/* Slider Section */}
      <div className="relative w-full">
        <Slider {...settings}>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Image src={image1} alt="Slide 1" className="block h-auto object-cover" />
              <div className="text-center p-4">
                <h5 className="text-xl font-bold">First Slide Title</h5>
                <p>Some representative placeholder content for the first slide. This is a brief description providing more details about the content of this slide.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Image src={image2} alt="Slide 2" className="block h-auto object-cover" />
              <div className="text-center p-4">
                <h5 className="text-xl font-bold">Second Slide Title</h5>
                <p>Some representative placeholder content for the second slide. This is a brief description providing more details about the content of this slide.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Image src={image3} alt="Slide 3" className="block h-auto object-cover" />
              <div className="text-center p-4">
                <h5 className="text-xl font-bold">Third Slide Title</h5>
                <p>“โบ๊ท นนทวัฒน์ วุฒิคำ” หนึ่งในนักศึกษาที่ได้รับทุนจากกองทุน PIM SMART ศิษย์เก่าจากสาขาวิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์ คณะวิศวกรรมศาสตร์และเทคโนโลยี สถาบันการจัดการปัญญาภิวัฒน์ (พีไอเอ็ม) เล่าด้วยความอิ่มเอมใจว่า “นอกจากทุนการศึกษาที่ได้รับจนจบการศึกษาแล้ว ผมยังได้รับทุนสำหรับใช้เป็นค่าใช้จ่ายในชีวิตประจำวันรวมถึงค่าที่พักด้วย เพราะนอกเหนือจากทุนการศึกษาแล้ว ค่าใช้จ่ายส่วนนี้ทำให้ผมได้มีที่อยู่และมีแรงที่จะศึกษาต่อไปครับ”</p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </Layout>
  );
};

export default Page;
