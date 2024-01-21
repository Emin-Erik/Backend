"use client";
import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function App() {
  const session = useCurrentUser();
  const SignOut = () => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            {session ? (
              <p className="font-bold">{session.name}</p>
            ) : (
              <p>Not signed in</p>
            )}
          </DropdownItem>

          {session && session.role === "ADMIN" ? (
            <DropdownItem href="/admin/users">
              <p className="font-bold">{session.role}</p>
            </DropdownItem>
          ) : (
            <DropdownItem href="/settings">
              <p className="font-bold">Settings</p>
            </DropdownItem>
          )}
          <DropdownItem href="/settings">
            <p className="font-bold">Settings</p>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={SignOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
