"use client";

import React, { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Link, Input, Button } from "@nextui-org/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/auth"
import provider from "@/app/components/Provider";

const SignInForm = () => {

  const router = useRouter();

  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage("Signing in...");

    try {
      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
        setMessage("Invalid credentials");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }

    setMessage(message);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
  }, [status]);

  return (
      <>
        <div className="flex flex-col gap-4 bg-gray-400 p-4">
          <a
              style={{backgroundColor: "#55acee"}}
              onClick={() => signIn("facebook")}
              role="button"
          >
            Continue with Facebook
          </a>
          <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => signIn("facebook")} className="mt-5"/>
          <p>{message}</p>
        </div>

      </>
  );
}
export default SignInForm;