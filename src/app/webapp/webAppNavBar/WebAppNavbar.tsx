import type { NextPage } from "next";
import { FaHeart } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import UserDropDown from "@/app/webapp/userDropDown/userDropDown";

const WebAppNavbar: NextPage = () => {
  return (
    <div>
      <Navbar className="mt-10 bg-black">
        <NavbarBrand>
          <a href="/">
            <img className="max-h-24" src="/assets/Axiom_Logo.png" alt="Logo" />
          </a>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              <FaHeart className="mr-2" /> Plan speichern
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              <LuRefreshCcw className="mr-2" />
              Plan generieren
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="danger" href="#">
              <RiDeleteBin2Line className="mr-2" />
              Plan löschen
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <UserDropDown />
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default WebAppNavbar;
