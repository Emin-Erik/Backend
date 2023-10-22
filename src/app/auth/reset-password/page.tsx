import ChangePasswordForm from "@/app/components/ChangePasswordForm";
import ResetPasswordForm from "@/app/components/ResetPasswordForm";
import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface ResetPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {

  const cookieStore = cookies();

  if (cookieStore.get("LoggedIn")?.value) {
  redirect("/");
  }

  if (searchParams.token) {
    const user = await prisma.user.findUnique({
      where: {
        resetPasswordToken: searchParams.token as string,
      },
    });
    if (!user) {
      return <div>Invalid token</div>;
    }

    return (
      <ChangePasswordForm resetPasswordToken={searchParams.token as string} />
    );
  } else {
    return <ResetPasswordForm />;
  }
};

export default ResetPasswordPage;
