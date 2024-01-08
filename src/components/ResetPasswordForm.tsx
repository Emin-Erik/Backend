"use client";
import React, { useState } from "react";
import { resetPassword } from "../actions/users/resetPassword";
import { Button, Input } from "@nextui-org/react";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    const message = await resetPassword(email);

    setMessage(message);
  };

  return (
    <div className="flex flex-col gap-4 w-2/4 justify-center m-auto h-screen">
      <a href="/">
        <img
          className="max-h-20 m-auto"
          src="/assets/Axiom_Logo.png"
          alt="Logo"
        />
      </a>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSubmit}>Reset Password</Button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPasswordForm;
