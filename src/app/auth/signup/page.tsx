import React from "react";
import SignUpForm from "../../components/SignUpForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SignUpPage = () => {
  const cookieStore = cookies();

  if (cookieStore.get("LoggedIn")?.value) {
  redirect("/");
  }
  return (
    <div className="flex flex-col gap-4">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
