import React from "react";

const WebApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="bg-foreground">{children}</div>;
};

export default WebApp;
