"use client";
import React, { useState } from 'react';
import Sidebar from "@/components/layoutComponents/sideBar"
import MenuBarMobile from "@/components/layoutComponents/menuBarMobile"
import Head from 'next/head';
export default function DashboardLayout({
    children,pageTitle 
  }: {
    children: React.ReactNode
    pageTitle: string
  }){
    
    const [showSidebar, setShowSidebar] = useState(false);
    return (
      <>
        <div className="min-h-screen">
            <div className="flex">
                <MenuBarMobile setter={setShowSidebar} />
                <Sidebar show={showSidebar} setter={setShowSidebar} />
                <div className="flex flex-col flex-grow max-w-screen-xl mx-auto md:w-full min-h-screen xl:pl-[225px] lg:pl-[258px] md:pl-[258px] sm:px-[20px] pt-[100px] pb-[10px]">
                    {children}
                </div>
            </div>
        </div>
    </>
    )
  }