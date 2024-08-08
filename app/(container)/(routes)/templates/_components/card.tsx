"use client";
import React from 'react'
import {format} from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import Link from 'next/link';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useClerk } from '@clerk/clerk-react';

export default function Card({template}:{template:any}) {
    const templateJson = JSON.parse(template.jsonValue)
    const {user} = useClerk()
    const  deleteTemp = useMutation(api.functions.deleteTemplate)
    const bookMark = useQuery(api.functions.getBookMarkByTitle,{
      userId:user?.id,
      title:"Favorites"
    })

    

    const addBookMark = useMutation(api.functions.addBookMark)
    const addTemplate = useMutation(api.functions.addTemplateToBookMark)

    const handleAddBookMarks = async () => {
      const data = await addBookMark({userId:user?.id,bookMark:{
        title:"Favorites",
        templates:[template],
        creationTime:Date.now(),
        description:"A new BookMark"
      }})
      return data;
    }

    const addToBookMark = async () => {
      const data = await addTemplate({userId:user?.id,title:"Favorites",template:template})
      console.log(data);
      
    }

    const handleDelete = async () => {
      const data = await deleteTemp({userId:user?.id,templateId:template?.id})
      return data;
    }


    
  return (

    <div className='w-max h-max lg:min-h-[200px] min-h-[200px] bg-gray-800 rounded-lg px-2 py-5 flex flex-col justify-between text-white' >
      <Link href={`/templates/${template?.id}`} className="flex  px-2 border-b-2 pb-2  ">
        <h1 className='truncate max-w-[260px]  ' >{templateJson?.title} </h1>
      </Link>
      <div className="flex w-full items-center ">
        <div className="">
         <p className='text-[14px] text-gray-400 font-light ' > {format(new Date(template.creationTime),"dd/MM/yyyy")}</p>
        </div>
        <div className="w-full flex justify-end gap-2 items-center">
            <FaRegBookmark className="text-[20px] cursor-pointer " onClick={() => addToBookMark()}/>
            <MdDelete className="text-[25px] text-red-500 cursor-pointer" onClick={() => handleDelete()} />

        </div>
      </div>
    </div>
  )
}
