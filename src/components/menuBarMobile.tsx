import React from 'react'
import Link from 'next/link'
import { FiMenu as Icon } from 'react-icons/fi'
import { FaUser } from 'react-icons/fa'

export default function MenuBarMobile({ setter }: { setter: any }) {
 
    return (
        <nav className=" z-20 fixed top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto px-2">
            <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter((oldVal: boolean) => !oldVal);
                }}
            >
                <Icon />
            </button>
            
            <div className="mx-auto text-white ">
              Inventory Management System
            </div>
            <Link
                className="text-3xl flex text-white"
                href="/login"
            >
                <FaUser />
            </Link>
        </nav>
    )
}