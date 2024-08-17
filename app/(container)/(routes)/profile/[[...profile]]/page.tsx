"use client";

import {  UserProfile } from "@clerk/nextjs";
import React from "react";

export default function Profile() {
  return (
    <div className="w-full min-h-screen bg-[#040727] flex  text-center ">
      <div className="m-5 w-full h-full">
        <UserProfile />
      </div>
     
    </div>
  );
}
