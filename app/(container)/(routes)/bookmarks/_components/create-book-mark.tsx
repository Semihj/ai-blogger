"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FolderPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { useClerk } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/components/ui/use-toast";
import Loading from "@/components/auth/loading";

export default function CreateBookMark() {
  const [formData, setFormData] = useState<any>({
    creationTime: Date.now(),
  });
  const { user }:any = useClerk();

  const [isLoading, setIsLoading] = useState(false);

  const addBookMark = useMutation(api.functions.addBookMark);

  const handleAddBookMarks = async () => {
    setIsLoading(true);
    const data = await addBookMark({ userId: user?.id, bookMark: formData });
    if (data) {
      setIsLoading(false);
      console.log(data);
      
      if (data.isError) {
        return toast({
          title: data.title,
          variant: "destructive",
        });
      }

      toast({
        title: data.title,
      });
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className=" w-full h-full flex flex-col gap-2  ">
          <h1 className="text-xl font-bold">Create a New BookMark</h1>
          <form
            className="w-full h-full flex flex-col gap-5 "
            onSubmit={handleAddBookMarks}
          >
            <div className=" flex flex-col gap-2 mt-2 ">
              <label className="font-semibold text-lg "> Title <span className="text-sm text-gray-400 font-normal" >(max 20) </span> </label>
              <input
                type="text"
                maxLength={20}
                placeholder="Favorites"
                required
                onChange={handleChange}
                name="title"
                className="focus:outline-none border p-2 w-full rounded-md  "
              />
            </div>
            <div className=" flex flex-col gap-2 ">
              <label className="font-semibold text-lg  ">
                {" "}
                Description (Optional) 
              </label>
              <textarea
                cols={20}
                rows={10}
                maxLength={250}
                name="description"
                onChange={handleChange}
                className="focus:outline-none border p-2 w-full rounded-md  "
              />
            </div>
            <SheetClose className="w-full" >
              <Button disabled={!formData?.title} className="w-full" >Create</Button>
            </SheetClose>
          </form>
        </div>
      )}
    </div>
  );
}
