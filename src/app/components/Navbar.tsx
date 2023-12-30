"use client";
import React from "react";
import {Button, Link, Modal, Navbar, NavbarBrand, NavbarContent, NavbarItem, useDisclosure} from "@nextui-org/react";
import {ThemeSwitcher} from "@/app/components/ui/theme/ThemeSwitcher";
import MyProfile from "./loggedIn/MyProfile";
import LoginModal from "../auth/signin/LoginModal";
import {useSession} from "next-auth/react";

const NavbarTemplate = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {data: session} = useSession();
    return (
        <Navbar>
            <NavbarBrand>
                <a href="/">
                    <img className="max-h-12" src="/assets/Axiom_Logo.png" alt="Logo"/>
                </a>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher/>
                </NavbarItem>
                {!session ? (
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

                ) : (
                    <>
                        <NavbarItem>
                            <MyProfile/>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
};

export default NavbarTemplate;
