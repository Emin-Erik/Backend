import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const page = req.nextUrl.searchParams.get("page") as string;

    if (!page) {
        const userCount = await prisma.user.count();
        return new NextResponse(
            JSON.stringify({ users: userCount }),
            {
                status: 200,
            },
        );
    } else {
        const users = await prisma.user.findMany({
            skip: Number(page),
            take: 10,
        });

        return new NextResponse(
            JSON.stringify({ users }),
            {
                status: 200,
            },
        );
    }
}
