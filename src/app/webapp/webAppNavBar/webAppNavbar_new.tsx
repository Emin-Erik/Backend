"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { NextPage } from "next";
import MyProfile from "@/components/loggedIn/MyProfile";
import { FaHeart } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
const WebAppNavbarNew: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Plan Generieren", "Plan Speichern", "Plan Löschen"];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <a href="/">
            <img className="max-h-12" src="/assets/Axiom_Logo.png" alt="Logo" />
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarBrand>
          <a href="/">
            <img
              className="max-h-12 sm:mr-4 md:mr-12"
              src="/assets/Axiom_Logo.png"
              alt="Logo"
            />
          </a>
        </NavbarBrand>
        <NavbarItem className="sm:mr-8 md:mr-8 lg:ml-30">
          <Link
            color="foreground"
            href="#"
            className="text-sm md:text-md lg:text-lg"
          >
            <FaHeart className="mr-2 lg:ml-12" />
            Plan speichern
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive
          className="sm:mr-6 sm:pl-4 md:mr-8 md:ml-12 lg:ml-20"
        >
          <Link
            href="#"
            color="success"
            aria-current="page"
            className="text-sm md:text-md lg:text-lg"
          >
            <LuRefreshCcw className="mr-2" />
            Plan generieren
          </Link>
        </NavbarItem>
        <NavbarItem className="sm:ml-4 md:ml-12 lg:ml-20">
          <Link
            color="danger"
            href="#"
            className="text-sm md:text-md lg:text-lg"
          >
            <RiDeleteBin2Line className="mr-2" />
            Plan löschen
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <MyProfile />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default WebAppNavbarNew;
