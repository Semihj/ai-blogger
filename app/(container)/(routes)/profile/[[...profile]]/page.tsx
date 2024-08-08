"use client";

import { UserButton, UserProfile } from "@clerk/nextjs";
import React from "react";

export default function Profile() {
  return (
    <div className="w-full min-h-screen bg-[#040727] flex  text-center ">
      <div className="m-5 w-full h-full">
        <UserProfile />
      </div>
     
      {/*  <h1 className='text-2xl md:text-4xl font-bold text-white text-center  ' ><span className='text-green-500 ' >Profile</span> Page Is Currently Under Development</h1> */}
    </div>
  );
}
