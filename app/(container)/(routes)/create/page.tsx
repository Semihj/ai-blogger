"use client";


import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleGetCode, handleGetContent } from "@/lib/handleAI";
import { useMutation } from "convex/react";
import { useClerk } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";

export default function Create() {
  const [searchText, setSearchText] = useState<any>();
  const params = useSearchParams();
  const [contentJson, setContentJson] = useState<any>();
  const [code, setCode] = useState<any>("");
  const [contentCode, setContentCode] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(false)
  const [templates, setTemplates] = useState<any>({
    code:null,
    jsonValue:null,
  })
  console.log(params);
  const contentRef = useRef();
  const { user }:any = useClerk();
  const router = useRouter()
 
    const createTemplateMutation = useMutation(api.functions.addTemplate);

  
  const handleCreate = async () => {
    try {
      const newBlog:any = await createTemplateMutation({
        userId: user?.id,
        newTemplate:{
          code:templates.code,
          jsonValue:templates.jsonValue
        }
      });
      setIsLoading(false)
      setTemplates({
        code:null,
        jsonValue:null,
      })
      setContentJson(null)
      const blog = newBlog[newBlog.length - 1]
      console.log(blog);
      

      router.push(`/templates/${blog?.id}`)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(templates.code && templates.jsonValue) {
      handleCreate()
    }
  }, [templates])
  
 

 
 

  const getSearchQuery = (e:any) => {
    setIsLoading(true)
    e.preventDefault();
    setSearchText(params.get("search"))
    router.push("/create")
  }

  const handleCode = async () => {
    try {
      if (contentJson && !templates?.code) {
        const res: any = await handleGetCode({ json: contentJson });
        setTemplates({...templates,code:res})
        console.log(res);
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

  console.log(searchText);

  const handleAI = async () => {
    try {
      const data: any = await handleGetContent({ text: searchText });
      setTemplates({...templates,jsonValue:data})
      console.log(data);

      setContentJson(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  };

 

  console.log(contentJson);
  console.log(code);
console.log(templates);

  return (
    <div className="w-full bg-[#0d1117] h-full text-white justify-center items-center flex-col flex ">
      {isLoading ? <h1>Loading</h1>: 
      <div className="flex flex-col">
      <input type="text" placeholder="Top 5 best cars in the world" className="px-4 py-3 rounded-md text-black " onChange={(e) => {
    router.push(`/create?search=${e.target.value}`)
      }} />
      <button  className="mt-4 border p-4 rounded-md font-semibold" onClick={getSearchQuery} >Create a blog</button>
  </div>}  </div>
  );
}
