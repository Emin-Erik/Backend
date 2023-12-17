import React from "react";
import {NavItem} from "./Sidebar";
import {FaHome, FaUser} from "react-icons/fa";

export const defaultNavItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: <FaHome className="w-6 h-6"/>,
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: <FaUser className="w-6 h-6"/>,
    },
    {
        label: "Users New",
        href: "/admin/users_new",
        icon: <FaUser className="w-6 h-6"/>,
    },
];