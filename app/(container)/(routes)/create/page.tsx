"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleGetCode, handleGetContent } from "@/lib/handleAI";
import { useMutation } from "convex/react";
import { useClerk } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import Loading from "@/components/auth/loading";
import { ChevronLeft, ChevronRight, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Create() {
  const [searchText, setSearchText] = useState<any>();
  const [inputValue, setInputValue] = useState<any>();
  const params = useSearchParams();
  const [contentJson, setContentJson] = useState<any>();
  const [code, setCode] = useState<any>("");
  const [isLoading, setIsLoading] = useState<any>(false);
  const [templates, setTemplates] = useState<any>({
    code: null,
    jsonValue: null,
  });
  const scrollRef:any = useRef();

  const { user }: any = useClerk();
  const router = useRouter();

  const createTemplateMutation = useMutation(api.functions.addTemplate);

  const exampleCommands = [
    {
      id: 1,
      label: "Top 5 cars In the world",
    },
    {
      id: 2,
      label: "Worst Movies Ever",
    },
    {
      id: 3,
      label: "World Cup 2022",
    },
    {
      id: 4,
      label: "Best Food's In the world",
    },
    {
      id: 5,
      label: "Greatest Athlete Ever",
    },
  ];

  const handleCreate = async () => {
    try {
      const newBlog: any = await createTemplateMutation({
        userId: user?.id,
        newTemplate: {
          code: templates.code,
          jsonValue: templates.jsonValue,
        },
      });
      setIsLoading(false);
      console.log(newBlog);
      
      setTemplates({
        code: null,
        jsonValue: null,
      });
      setContentJson(null);
      
      const blog = newBlog[newBlog.length - 1];

      router.push(`/templates/${blog?.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (templates.code && templates.jsonValue) {
      handleCreate();
    }
  }, [templates]);

  const getSearchQuery = (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    setSearchText(params.get("search"));
    router.push("/create");
  };

  const handleCode = async () => {
    try {
      if (contentJson && !templates?.code) {
        const res: any = await handleGetCode({ json: contentJson });
        setTemplates({ ...templates, code: res });
        setCode(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCode();
  }, [contentJson]);

  useEffect(() => {
    if (searchText) {
      handleAI();
    }
  }, [searchText]);


  const handleAI = async () => {
    try {
      const data: any = await handleGetContent({ text: searchText });
      setTemplates({ ...templates, jsonValue: data });

      setContentJson(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (inputValue) {
      router.push(`/create?search=${inputValue}`);
    }
  }, [inputValue]);


  return (
    <div className="w-full bg-[#0a1a33] h-full text-white flex-col flex ">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full h-full lg:p-20 p-2 ">
          <h1 className="text-[60px] font-bold "> Hello {user?.firstName} </h1>
          <p className="font-semibold text-[30px] my-5 ">
            What kind of a Blog you wanna create today
          </p>
          <div className="w-full flex">
             <button
            className="hidden lg:inline-block"
              onClick={() => {
                scrollRef.current.scrollLeft -= 500;
              }}
            >
              <ChevronLeft size={50} />
            </button> {" "}
            <div className="flex gap-4 w-full lg:overflow-hidden overflow-x-auto scroll-smooth " ref={scrollRef}>
          
              {exampleCommands.map((command) => (
                <div
                  key={command.id}
                  onClick={() => setInputValue(command.label)}
                  className="bg-gray-700 min-w-[50%] lg:min-w-[300px] lg:max-w-[400px] p-4 rounded-md min-h-[200px]  cursor-pointer "
                >
                  <h1 className="lg:text-[30px] font-semibold ">
                    {command.label}{" "}
                  </h1>
                </div>
              ))}
            </div>
            <button
            className="hidden lg:inline-block text-[50px]"
              onClick={() => {
                scrollRef.current.scrollLeft += 500;
              }}
            >
              <ChevronRight className=" " size={50} />
            </button> 
          </div>
          <form className="w-full flex items-center gap-2 mt-5" onSubmit={getSearchQuery}>
            <input
              type="text"
              placeholder="Best football players"
              className="px-4 py-5 w-[80%] lg:w-full rounded-md focus:outline-none text-black "
              value={inputValue} onChange={(e) => {
                setInputValue(e.target.value)    
                router.push(`/create?search=${e.target.value}`)
                  }}
                  
            />
          <Button> <SendHorizontal size={50}  />
         </Button>  </form>
        </div>
      )}
    </div>
  );
}
