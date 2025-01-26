"use client";
import React, { JSX } from 'react';
import HomeLayout from '@/presentation/components/layouts/HomeLayout';
import { AboutUs } from '@/presentation/components/common/aboutUs';



export default function HomePage(): JSX.Element {



  return (
    <HomeLayout>
      <AboutUs />
    </HomeLayout>
  );
}
