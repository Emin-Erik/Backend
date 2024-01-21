import React from "react";
import WebAppNavbar from "./webAppNavBar/WebAppNavbar";

const WebApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <WebAppNavbar />
      {children}
    </div>
  );
};

export default WebApp;
