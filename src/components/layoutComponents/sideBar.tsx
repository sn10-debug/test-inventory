"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMenu as Icon } from 'react-icons/fi'

export default function Sidebar({ show, setter }: { show: boolean, setter: React.Dispatch<React.SetStateAction<boolean>> }) {
    const navigation=[{id:1,name:'Listings',route:'/listings'},{id:2,name:'Orders',route:'orders/admin'},{id:3,name:'Statistics',route:'/stats'},{id:4,name:'Sale',route:'/sale'},{id:4,name:'PromoCode',route:'/promoCode'},{id:5,name:'Messages',route:'/messaging/inbox'}]
    // Define our base class
    const className = "bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px]";
    // Clickable menu items
    const MenuItem = ({ name, route }: { name: string, route: string }) => {
        // Highlight menu item based on currently displayed route

        return (
            <Link
                href={route}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 hover:bg-white/10 hover:text-white transition-colors duration-200`}
            >
                <div>{name}</div>
            </Link>
        )
    }

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex fixed top-0 right-0 bottom-0 left-0 bg-black/50   z-30`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )
    return (
        <>
            <div className={` ${className}${appendClass}`} style={{position:'fixed'}}>
                <div className="p-2 flex max-w-screen-xl w-full object-contain items-center justify-center space-x-4">
                <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter((oldVal: boolean) => !oldVal);
                }}
            >
                <Icon />
            </button>
                    <Link href="/" className='flex justify-center items-center'>

                         <h1 className='text-white text-3xl'>BohoTree</h1>
                    </Link>
                </div>
                <div className="flex flex-col text-white">
                    {navigation.map((item:any) => (
                        <MenuItem
                        name={item.name}
                        route={item.route}
                        />
                    ))}
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}