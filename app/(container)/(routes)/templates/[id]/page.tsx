"use client";

import { api } from '@/convex/_generated/api';
import { useClerk } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { useParams} from 'next/navigation'
import React from 'react'
import Content from './_components/Content';
import CodeContent from './_components/CodeContent';




export default function TemplatePage() {

    const {user}:any = useClerk()
    const params:any = useParams()

    const template = useQuery(api.functions.getTemplateById,{
        userId:user?.id,
        templateId:params?.id
    })
    
  return (
    <div className='w-full h-full flex flex-col md:px-4 ' >
      <div className="w-full  ">
      <Content data={template?.jsonValue} code={template?.code} /> 
      </div>
      <div className=" w-full">
        <CodeContent contentCode={template?.code} />
      </div>
      </div>
  )
}
