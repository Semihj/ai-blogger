"use client";
import React from "react";
import parse from "html-react-parser";

export default function Content({ data, code }: { data: any; code: any }) {
  return (
    <div className={`w-full  `}>
      {data && code ? (
        <div className="w-full h-full">{parse(code)}</div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <h1 className="text-[3rem] lg:text-[5rem] font-bold text-white">
            Blog Post Not found
          </h1>
        </div>
      )}
    </div>
  );
}
