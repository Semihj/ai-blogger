"use client";

import { api } from '@/convex/_generated/api';
import { useClerk } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import React from 'react'
import Card from './_components/card';

export default function TemplatePage() {

  
  const {user}:any = useClerk();
  const templates = useQuery(api.functions.getTemplatesAndSort,{
    userId:user?.id
  })



  return (
    <div className='flex flex-col w-full min-h-full  ' >
      <div className="h-20 w-full border-b-2 "></div>
      <div className="p-4 flex gap-2 flex-wrap w-full min-h-full ">
      {templates?.map((template) => (
        <div key={template?.id} >
          <Card template={template}/>
        </div>
      ))}</div>
    </div>
  )
}
