"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useClerk } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import { EllipsisVertical, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ShowBookMarks({ bookMarks }: { bookMarks: any }) {
  const { user }:any = useClerk();
  const deleteBookmark = useMutation(api.functions.deleteBookMark);
  
  const handleDelete = async ({ bookmark }: { bookmark: any }) => {
    try {
      const data = await deleteBookmark({
        userId: user?.id,
        bookMarkId: bookmark.id,
      });
      toast({
        title: `"${bookmark.title}" deleted successfully `,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-max overflow-y-auto gap-2 ">
      {bookMarks?.map((bookmark:any) => (
        <div
          className="flex w-full max-h-20 justify-between border-b-2 text-black md:p-2 "
          key={bookmark.id}
        >
          <div className="flex flex-col gap-2">
            <Link href={`/bookmarks/${bookmark.title}`}>
              <h1 className="text-lg font-bold text-underline cursor-pointer">
                {bookmark.title}{" "}
              </h1>
            </Link>{" "}
            <p className="text-gray-500 font-normal text-sm">
              {bookmark.templates.length} Templates{" "}
            </p>
          </div>
          <div className="h-full flex flex-col text-end gap-2 items-end text-gray-500 font-normal text-sm">
            <span className="">
              {format(new Date(bookmark.creationTime), "dd/MM/yy")}{" "}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger>
              <button>
                <EllipsisVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="flex gap-2 p-3" onClick={() => handleDelete({bookmark:bookmark}) } >
                <Trash className="text-red-600 cursor-pointer "  />
                <h1 className="text-red-600 cursor-pointer " >Delete</h1>
              </div>
           </DropdownMenuContent> </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
