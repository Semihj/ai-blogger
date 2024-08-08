import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Template",
    description: "AI SaaS Platform."
  };


export default function TemplateLayout({children}:{children:React.ReactNode}) {





  return (
    <div className='w-full  ' >{children} </div>
  )
}
