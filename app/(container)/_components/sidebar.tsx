"use client";

import { cn } from '@/lib/utils'

import { LayoutDashboard,House, FileStack, Settings, UserPen, BadgePlus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../../../public/logo.png";
import { usePathname} from 'next/navigation'
import { useClerk, UserButton } from '@clerk/nextjs';

export default function Sidebar() {


    const pathname = usePathname()

    const {user} = useClerk()
    const sidebarRoutes = [
        {
            label:"Dashboard",
            href:"/dashboard",
            icon:House,
            color:"text-orange-600 "

        },
        {
            label:"Create",
            href:"/create",
            icon:BadgePlus,
            color:"text-purple-600 "

        },
        {
            label:"Templates",
            href:"/templates",
            icon:FileStack,
            color:"text-blue-600 "

        },
      
        {
            label:"Profile",
            href:"/profile",
            icon:UserPen,
            color:"text-green-500 "

        },  {
            label:"Settings",
            href:"/settings",
            icon:Settings,
            color:"text-gray-300 "

        },
    ]

  return (
    <div className='bg-[#082323] min-h-screen space-y-4 w-72 fixed left-0 top-0 p-4 flex flex-col text-white ' >
        <div className="px-3 py-2">
            <Link href={"/"} className='flex items-center pl-3 mb-14' >
                <div className="relative w-14 h-14  mr-4">
                    <Image fill src={logo} className='rounded-full object-cover' alt='home' />
                </div>
                <div className={cn("text-2xl font-bold text-orange-500")}>
                    AI BLOOGER
                </div>
            </Link>

        </div>
        <div className="space-y-3">
            <div className="ml-4 hidden md:inline-block ">
        <UserButton/>
       
        </div>
        {sidebarRoutes.map((route,index)  => (
                        <Link
                        href={route.href}
                        key={route.href}
                        className={cn(
                          "text-lg group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                          pathname === route.href
                            ? "text-white bg-white/10"
                            : "text-zinc-400"
                        )}
                      >
                        <div className="flex items-center flex-1">
                          <route.icon className={cn("h-8 w-8 mr-3 ", route.color)} />
                          {route.label}
                        </div>
                      </Link>
          
        ))}
</div>
    </div>
  )
}
