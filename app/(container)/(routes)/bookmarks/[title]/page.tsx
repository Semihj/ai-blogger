"use client"
import { api } from '@/convex/_generated/api';
import { useClerk } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { useParams} from 'next/navigation'
import React from 'react'
import Card from '../../templates/_components/card';
import BookmarkTemplateCard from './_components/bookmarkTemplateCard';

export default function BookMarks() {

 const params:any = useParams()
 const {user}:any = useClerk()
 const bookMark:any = useQuery(api.functions.getBookMarkByTitle,{
    userId:user?.id,
    title:params.title
 })
 
console.log(bookMark);
 

  return (
    <div className='flex flex-col w-full min-h-full  ' >
     
    <div className="h-20 w-full border-b-2 "></div>
    <div className="p-4 flex gap-2 flex-wrap w-full min-h-full ">
    {bookMark?.templates?.map((template:any) => (
      <div key={template} >
        <BookmarkTemplateCard templateId={template}/>
      </div>
    ))}</div> 
    
    </div>
  )
}
