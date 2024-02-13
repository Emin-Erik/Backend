import { auth } from "@/auth";
import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/app/(protected)/layout/Navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const email = session.user?.email;
  if (email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || user.role !== "ADMIN") {
      redirect("/");
    }
  }

  if (session) {
    return (
      <SessionProvider session={session}>
        <Providers>
          <div className="min-h-screen">
            <div className="flex">
              <div>
                <Navbar />
              </div>
              <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen mt-16">
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </SessionProvider>
    );
  }
  return <div>This is protected and you do not have access to it.</div>;
};

export default ProtectedLayout;
