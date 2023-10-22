"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Link,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { MailIcon } from "./MailIcon";
import { LockIcon } from "./LockIcon";

export default function App() {
  const router = useRouter();

  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage(<Spinner />);

    try {
      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      useEffect(() => {
        if (status === "authenticated") {
          router.refresh();
          router.push("/");
        }
      }, [status]);

      if (!signInResponse || signInResponse.ok !== true) {
        setMessage("Invalid credentials");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
    setMessage(message);
    setMessage("Invalid credentials");
  };

  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                type="email"
                label="Email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                variant="bordered"
                isRequired
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                onChange={(e) => setPassword(e.target.value)}
                isRequired
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <div className="flex py-2 px-1 justify-between">
                <Link color="primary" href="/auth/reset-password" size="sm">
                  Forgot password?
                </Link>
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  type="submit"
                  isDisabled={!email || !password}
                >
                  Sign in
                </Button>
              </div>
            </ModalBody>
            <ModalFooter>{message}</ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  );
}
