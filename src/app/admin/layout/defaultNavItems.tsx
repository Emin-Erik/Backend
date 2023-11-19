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
        label: "Team",
        href: "/admin/users",
        icon: <FaUser className="w-6 h-6"/>,
    },
];