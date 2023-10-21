"use client";
import React, { useState } from "react";
import { changePassword } from "../actions/users/changePassword";
import { Button, Input } from "@nextui-org/react";

interface ChangePasswordFormProps {
  resetPasswordToken: string;
}

const ChangePasswordForm = ({
  resetPasswordToken,
}: ChangePasswordFormProps) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const message = await changePassword(resetPasswordToken, password);

    setMessage(message);
  };

  return (
    <div className="flex flex-col gap-4 w-1/4 justify-center m-auto h-screen">
      <a href="/">
        <img
          className="max-h-20 m-auto"
          src="/assets/Axiom_Logo.png"
          alt="Logo"
        />
      </a>
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button onClick={handleSubmit}>Change Password</Button>
      <p>{message}</p>
    </div>
  );
};

export default ChangePasswordForm;
