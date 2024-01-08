import { auth } from "@/auth"
import React from "react";
import {redirect} from "next/navigation";
import prisma from "@/app/lib/prisma";
import {Providers} from "./providers";
import Layout from './layout/Layout';

interface ProtectedLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

type ShowSidebarState = boolean;

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {
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
            <Providers>
                <div className="min-h-screen">
                    <div className="flex">
                        <Layout/>
                        <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen mt-16">
                            {children}
                        </div>
                    </div>
                </div>
            </Providers>
        );
    }
    return <div>This is protected and you do not have access to it.</div>;
};

export default ProtectedLayout;
