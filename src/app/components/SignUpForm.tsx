"use client";

import React, { useState } from "react";
import { signUp } from "../actions/users/signUp";
import { Button, Input } from "@nextui-org/react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage("Signing up...");
    const message = await signUp(email, username, password);
    setMessage(message);
  };

  return (
    <div className="grid grid-cols-2 h-screen	">
      <div className="bg-cover bg-center bg-[url('/assets/register.jpg')] h-screen	"></div>
      <div className="min-h-screen flex flex-col justify-center ">
        <div className="flex flex-col gap-4 w-2/4 justify-center m-auto	">
          <a href="/">
            <img
              className="max-h-20 m-auto"
              src="/assets/Axiom_Logo.png"
              alt="Logo"
            />
          </a>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="username"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleSubmit}>Sign up</Button>

          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
