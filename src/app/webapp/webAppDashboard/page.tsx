import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Sidebar } from "./components/sidebar";
import React from "react";
import Calender from "./components/calender";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function WebPage() {
  return (
<>
  <div className="grid grid-cols-2 gap-4 mb-6">
    <div className="ml-6 mr-6 mt-6 min-w-[11rem] h-[18rem] drop-shadow-2xl rounded-lg bg-black/25"></div>
    <div className="mr-6 mt-6 min-w-[11rem] h-[18rem] drop-shadow-2xl rounded-lg bg-black/25"></div>
  </div>

  <div className="ml-6 mr-6 min-w-[16.5rem] min-h-[50rem] drop-shadow-2xl rounded-lg bg-black/25"></div>
  
</> 


  
  );
}
