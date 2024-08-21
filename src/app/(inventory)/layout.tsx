"use client";
import React, { useState } from 'react';
import Sidebar from "@/components/layoutComponents/sideBar";
import MenuBarMobile from "@/components/layoutComponents/menuBarMobile";
import Head from 'next/head';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      {/* Use Head to dynamically set the page title */}
      <Head>
        <title>Dashboard</title> {/* Replace with a dynamic title if needed */}
      </Head>

      <div className="min-h-screen">
        <div className="flex">
          <MenuBarMobile setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <div className="flex flex-col flex-grow max-w-screen-xl mx-auto md:w-full min-h-screen sm:px-[10px] pt-[100px] pb-[10px]">
            {children}
          </div>
        </div>
      </div>
    </>
     );
    }