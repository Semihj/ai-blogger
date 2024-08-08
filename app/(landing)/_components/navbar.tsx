"use client";

import Image from 'next/image'
import React from 'react'
import logo from "../../../public/logo.png"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useClerk } from '@clerk/clerk-react'

export default function Navbar() {

  const {user} = useClerk()

  return (
    <div className='w-full h-[92px] py-4 md:py-1 border-b-2 flex justify-between  items-center px-4 lg:px-20 ' >
            <Link href={"/"} className="" >
            <h1 className='text-orange-500 font-semibold text-[23px] lg:text-[32px] font-mono ' >AI-BLOGGER</h1>
       </Link> 
       {!user ?  
       <div className="flex gap-2">
        <Link href={"/sign-in"} >
        <Button>
          Sign In
        </Button>
        </Link>
        <Link href={"/sign-up"} >
        <Button variant={"link"} >
          Sign Up
        </Button>
        </Link>
       </div>
       :
       ""}
    </div>
  )
}
