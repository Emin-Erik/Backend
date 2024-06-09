"use client";

import WebPage from "./webAppDashboard/page";
import SkeletonWeb from "./webAppDashboard/skeletonWeb";
import WebAppNavbarNew from "./webAppNavBar/webAppNavbar_new";
import SkeletonNav from "./webAppNavBar/skeletonNav";
import { useState, useEffect } from "react";


const WebApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <div
      className="bg-cover h-screen w-screen"
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp8207303.jpg")',
      }}
    >
      {loading ? <SkeletonNav /> : <WebAppNavbarNew />}
      {loading ? <SkeletonWeb /> : <WebPage />}
    </div>
  );
};

export default WebApp;
