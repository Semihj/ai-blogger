"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FolderPlus, Search } from "lucide-react";

import CreateBookMark from "./_components/create-book-mark";
import ShowBookMarks from "./_components/ShowBookMarks";
import { useClerk } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

export default function BookMarkPage() {
  
  const {user}:any = useClerk();

  const [bookMarks, setBookMarks] = useState<any>()
  const [searchText,setSearchText] = useState<any>("")
const getBookMarks = useQuery(api.functions.getBookMarks,{
      userId:user?.id
  })

  

 

  const handleSearch = async () => {
    try {
      if(searchText) {
          const copyBookMarks = bookMarks
      const sort = copyBookMarks?.filter((bookmark:any) => {
        if(bookmark.title.toLowerCase().includes(searchText.toLowerCase())){
          return bookmark
        } else {
          return;
        }
      }
    )
      setBookMarks(sort)
      } else {
        setBookMarks(getBookMarks)
      }
    
            
    } catch (error) {
      /* A */
      console.log(error);
      
    }
  }
  useEffect(() => {
    if(bookMarks) {
      handleSearch()
    }
  }, [searchText])
  
  
  useEffect(() => {
    setBookMarks(getBookMarks)
  }, [getBookMarks])
  


  

  return (
    <div className="bg-[#060e38] w-full min-h-screen text-white p-4 ">
      <div className="container border-2 h-[80vh] bg-white rounded-lg flex flex-col p-2">
        <nav className="w-full gap-2 md:gap-0 h-max md:h-20 p-2 border-b-2 flex flex-wrap md:flex-nowrap items-center justify-between  ">
          <div className="w-full  flex gap-2 items-center">
          <input
            type="text"
            placeholder="Favorites"
            className="max-w-[500px] w-[80%] placeholder:text-black/40 p-2 focus:outline-none text-black border rounded-md "
            onChange={(e) => setSearchText(e.target.value) }
          />
          <Search className="text-black " onClick={() => handleSearch()}  />
          </div>
          <Sheet>
            <SheetTrigger>
              <Button variant={"secondary"} className="">
                <FolderPlus />
              </Button>
            </SheetTrigger>
            <SheetContent side={"right"}>
            <CreateBookMark/>
            </SheetContent>
          </Sheet>
        </nav>
        <ShowBookMarks bookMarks={bookMarks} />
      </div>
    </div>
  );
}
