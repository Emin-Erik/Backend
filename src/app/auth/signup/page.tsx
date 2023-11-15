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
    <section className='py-24'>
    <div className='container'>
      <SignUpForm />
    </div>
  </section>
  );
};

export default SignUpPage;
