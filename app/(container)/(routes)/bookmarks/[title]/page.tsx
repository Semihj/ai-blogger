"use client"
import { api } from '@/convex/_generated/api';
import { useClerk } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

export default function BookMarks() {

 const params:any = useParams()
 const {user}:any = useClerk()
 const bookMark = useQuery(api.functions.getBookMarkByTitle,{
    userId:user?.id,
    title:params.title
 })
 
console.log(bookMark);


  return (
    <div>BookMarks</div>
  )
}
