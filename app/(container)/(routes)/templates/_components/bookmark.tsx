"use client";

import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import { Square, SquareCheckBig } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Bookmark({
  bookmark,
  template,
  user,
}: {
  bookmark: any;
  template: any;
  user: any;
}) {
  const addTemplate = useMutation(api.functions.addTemplateToBookMark);
  const removeTemplate = useMutation(api.functions.removeTemplateFromBookMark)

  const isBookMarked = useQuery(api.functions.isInBookMark, {
    userId: user?.id,
    title: bookmark.title,
    id: template?.id,
  });
  console.log(isBookMarked);

  const addToBookMark = async ({ title }: { title: string }) => {
    const data = await addTemplate({
      userId: user?.id,
      title: title,
      template: template,
    });
    if (data.error) {
      toast({
        title: data.error,
        variant: "destructive",
      });
    }
    console.log(data);
  };
  
  const removeFromBookmark = async () => {
    try {
      const data = await removeTemplate({
        userId:user?.id,
        title:bookmark.title,
        templateId:template?.id
      })
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div
      className="flex w-full max-h-20 min-h-[60px] justify-between border-b items-center text-black md:p-2 "
      key={bookmark.id}
    >
      <div className="flex items-center gap-2 ">
        {isBookMarked ? (
          <SquareCheckBig onClick={() => removeFromBookmark()} />
        ) : (
          <Square
            className="w-5 h-5 "
            onClick={() => addToBookMark({ title: bookmark?.title })}
          />
        )}

        <Link href={`/bookmarks/${bookmark.title}`}>
          <h1 className="text-lg font-bold text-underline cursor-pointer">
            {bookmark.title}
          </h1>
        </Link>
      </div>
      <span className="h-full flex  text-end items-end text-gray-500 font-normal text-sm">
        {format(new Date(bookmark.creationTime), "dd/MM/yy")}
      </span>
    </div>
  );
}
