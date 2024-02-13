import React from "react";
import classNames from "classnames";
import { ThemeSwitcher } from "@/components/ui/theme/ThemeSwitcher";
import MyProfile from "@/components/loggedIn/MyProfile";

const Navbar = () => {
  return (
    <nav
      className={classNames({
        "bg-background text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16 mb-1": true, //positioning & styling
      })}
    >
      <div>
        <a href="/">
          <img className="max-h-12" src="/assets/Axiom_Logo.png" alt="Logo" />
        </a>
      </div>
      <div className="flex-grow"></div>
      <ThemeSwitcher />
      <MyProfile />
    </nav>
  );
};

export default Navbar;
