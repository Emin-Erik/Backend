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
              className="max-h-12 sm:mr-4"
              src="/assets/Axiom_Logo.png"
              alt="Logo"
            />
          </a>
        </NavbarBrand>
        <NavbarItem className="sm:mr-4 small2:ml-2 mid2:ml-8 mid3:ml-12 md:mr-2 mid4:ml-12 mid4:mr-4 mid5:ml-14 mid5:mr-10 prelarge:ml-16 lg:ml-20">
          <Link
            color="foreground"
            href="#"
            className="text-sm md:text-lg prelarge:text-xl"
          >
            <FaHeart className="mr-2" />
            Plan speichern
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive
          className="sm:mr-6 sm:pl-4 md:ml-2"
        >
          <Link
            href="#"
            color="success"
            aria-current="page"
            className="text-sm md:text-lg prelarge:text-xl  mid3:ml-2 mid4:mr-4 mid5:mr-12"
          >
            <LuRefreshCcw className="mr-2" />
            Plan generieren
          </Link>
        </NavbarItem>
        <NavbarItem className="sm:ml-2 small2:ml-4 mid2:ml-2 md:ml-2 mid3:ml-2 prelarge:mr-4 mid4:mr-2">
          <Link
            color="danger"
            href="#"
            className="text-sm md:text-lg prelarge:text-xl"
          >
            <RiDeleteBin2Line className="mr-2" />
            Plan löschen
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="sm:ml-2">
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
