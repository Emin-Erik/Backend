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
      <div className="hidden md:block">
        <div className="">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar />

              <div className="col-span-3 lg:col-span-4">
                <div className="h-full px-4 py-6 lg:px-8 mt-4">
                  <Calender />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
