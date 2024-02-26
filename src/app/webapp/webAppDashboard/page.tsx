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
  <div className="grid grid-cols-2 gap-6">
    <div className="mt-6 ml-6 mb-12 h-[12rem] w-[10rem] drop-shadow-2xl rounded-lg bg-white/30"></div>
    <div className="mt-6 mb-12 h-[12rem] w-[10rem] drop-shadow-2xl rounded-lg bg-white/30"></div>
  </div>

  <div className="mt-2 ml-6 mb-8 mr-6 h-[30rem] w-[23rem] drop-shadow-2xl rounded-lg bg-black/25"></div>
</>

  
  );
}
