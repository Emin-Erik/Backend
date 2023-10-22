"use client";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { Modal, useDisclosure } from "@nextui-org/react";

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/app/components/ui/theme/ThemeSwitcher";
import MyProfile from "./loggedIn/MyProfile";
import LoginModal from "../auth/signin/LoginModal";
import { useSession } from "next-auth/react";

const NavbarTemplate = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Navbar>
      <NavbarBrand>
        <a href="/">
          <img className="max-h-12" src="/assets/Axiom_Logo.png" alt="Logo" />
        </a>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {session && session.user?.email ? (
          <>
            <NavbarItem>
              <MyProfile />
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/signup"
                variant="ghost"
              >
                Registrieren
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onPress={onOpen}
                as={Link}
                color="primary"
                variant="solid"
              >
                Login
              </Button>
            </NavbarItem>
            <Modal
              backdrop={"blur"}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <LoginModal></LoginModal>
            </Modal>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarTemplate;
