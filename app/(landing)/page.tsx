"use client"

import Image from 'next/image'
import React from 'react'
import landing_img from "../../public/ai-blog.png"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Typewriter from 'typewriter-effect';
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className='w-full h-full flex  md:px-10 px-4 py-5 md:py-2 bg-[#0b051d] text-white ' >
      <div className="flex flex-col w-full h-full items-center justify-center ">
        <div className="flex flex-col md:flex-row w-full gap-3 justify-between h-full md:h-auto items-center  ">
          <div className="w-full h-full flex items-start md:px-20  justify-center flex-col">
            <div className="flex flex-col w-full h-full">
            <h1 className='lg:text-3xl text-lg font-semibold' >
            Your Friendly Neighborhoord <span className='text-orange-500' >
              <Typewriter
              options={{
                strings:["AI-BLOGGER","CONTENT CRAFTER","AI AUTHOR"],
                autoStart:true,
                loop:true,
                delay:50
              }}
              
              />
            </span>
            </h1>
            <p className='max-w-[400px] text-[16px] md:text-[25px] text-gray-400 hover:text-gray-200 transition-all ' >
              AI Blogger is a cutting-edge platform that harnesses the power of artificial intelligence to generate high-quality, engaging blog content.
            </p>
</div>
    <div className="mt-2 md:mt-5">
     <Link href={"/templates"} >
     <Button className="md:h-10 md:rounded-md md:px-8 md:py-8 md:text-lg ">Try It Now</Button>
     </Link> 
    </div>
          </div>
          <div className="relative w-full h-full min-h-[400px]  flex items-center justify-center">
            <Image src={landing_img} className='object-cover ' fill alt='' />
          </div>
        </div>
       
        
      </div>
    </div>
  )
}
