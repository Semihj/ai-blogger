"use client";
import React from "react";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useClerk } from "@clerk/clerk-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Bookmark from "./bookmark";
import { FolderPlus } from "lucide-react";
import CreateBookMark from "../../bookmarks/_components/create-book-mark";
import { sortByCreationTime } from "@/lib/helpers";
import { bookmarkType, bookmarkTypes } from "@/types";
import { toast } from "@/components/ui/use-toast";



export default function Card({ template }: { template: any }) {
  const templateJson = JSON.parse(template.jsonValue);
  const { user }:any = useClerk();
  const deleteTemp = useMutation(api.functions.deleteTemplate);
  const bookMarks:any= useQuery(api.functions.getBookMarks, {
    userId: user?.id,
  });
 


  const handleDelete = async () => {
 /*   const remove = await removeFromBookmarks({
        userId:user?.id,
        templateId:template?.id
      })
 */
    try {
     
      const data = await deleteTemp({
      userId: user?.id,
      templateId: template?.id,
    });
      toast({
        title:`Template deleted successfully `
      })
    } catch (error) {
      console.log(error);
      
    }
    
  };

  return (
    <div className="w-max h-max lg:min-h-[200px] min-h-[200px] bg-gray-800 rounded-lg px-2 py-5 flex flex-col justify-between text-white">
      <Link
        href={`/templates/${template?.id}`}
        className="flex  px-2 border-b-2 pb-2  "
      >
        <h1 className="truncate max-w-[260px]  ">{templateJson?.title} </h1>
      </Link>
      <div className="flex w-full items-center ">
        <div className="">
          <p className="text-[14px] text-gray-400 font-light ">
            {format(new Date(template.creationTime), "dd/MM/yyyy")}
          </p>
        </div>
        <div className="w-full flex justify-end gap-2 items-center">
          <Sheet>
            <SheetTrigger>
              <FaRegBookmark
                className="text-[20px] cursor-pointer " /* onClick={() => addToBookMark()} */
              />
            </SheetTrigger>
            <SheetContent side={"bottom"} className="w-full h-72">
              <div className="flex flex-col h-full gap-4 ">
                <h1 className="text-lg font-bold line-clamp-1">
                  {templateJson?.title}{" "}
                </h1>
                <div className="w-full h-full flex flex-col overflow-y-scroll gap-3 focus:outline-none ">
                  {bookMarks?.map((bookmark:bookmarkType,index:number) => (
                    <Bookmark key={index} user={user} template={template} bookmark={bookmark} />
                  ))}
             <Sheet>   
            <SheetTrigger><div className="p-2 flex gap-2"> 
             <FolderPlus className="" />
              <h1>Create a Bookmark</h1> 
              </div> 
            
              </SheetTrigger>
              <SheetContent side={"right"} >
                <CreateBookMark/>
              </SheetContent>
               </Sheet> 
               </div>
               </div>
            </SheetContent>
          </Sheet>
          <MdDelete
            className="text-[25px] text-red-500 cursor-pointer"
            onClick={() => handleDelete()}
          />
        </div>
      </div>
    </div>
  );
}
