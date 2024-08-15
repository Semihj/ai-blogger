"use client";

import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import pretty from "pretty";
import { ColorRing } from "react-loader-spinner";
import { Copy,ClipboardCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function CodeContent({contentCode}:{contentCode:any}) {
  const [isCopied,setIsCopied] = useState(false)
   const {toast} = useToast()
  const handleCopy = () => {
    navigator.clipboard.writeText(contentCode)
  
    setIsCopied(true)
  }


 

  useEffect(() => {
    if(isCopied) {
      toast({
        description:"Copied To Clipboard"
      })
      setTimeout(() => {
        setIsCopied(false)
      },3000)
    }
  }, [isCopied])
  
  console.log(contentCode);
  
  
 
  return (
    <div className="w-full overflow-hidden text-wrap break-words h-full bg-black   ">
      {contentCode === "" ? (
        <div className="w-full flex items-center justify-center h-screen">
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#000000", "#000000", "#000000", "#020202", "#000000"]}
          />
        </div>
      ) : (
        <div className="w-full min-h-max relative  border-white">
          <SyntaxHighlighter language="html" style={tomorrow}>
            {contentCode}
          </SyntaxHighlighter>
          <Button className={`absolute bottom-2 mt-5 right-8  ${isCopied ? "text-white bg-black":"text-black bg-white" }  cursor-pointer `} > {isCopied ? <ClipboardCheck className="text-[30px] cursor-pointer  text-black"  /> :  <Copy onClick={() => handleCopy()} className="text-[30px] cursor-pointer text-black " />} </Button>
        </div>
      )}
     
    </div>
  );
}
