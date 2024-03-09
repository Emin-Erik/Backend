"use client";
import { Metadata } from "next";
import React, { useState } from "react";
import WebCalender from "./components/webCalender";
import Werte from "./components/werte";
import Config from "./components/config";


export default function WebPage() {

  return (
<>
  <div className="grid grid-cols-2 gap-4 mb-6">
    <div className="ml-6 mr-6 mt-6 min-w-[11rem] h-[18rem] drop-shadow-2xl rounded-lg bg-black/25">
      <Werte/>
    </div>
    <div className="mr-6 mt-6 min-w-[11rem] h-[18rem] drop-shadow-2xl rounded-lg bg-black/25">
    <Config/>
    </div>
  </div>

  <div className="ml-6 mr-6 min-w-[16.5rem] min-h-[50rem] drop-shadow-2xl rounded-lg bg-black/25">
  <WebCalender />
  </div>
  
</> 


  
  );
}
