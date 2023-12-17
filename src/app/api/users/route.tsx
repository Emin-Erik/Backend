import {NextResponse} from "next/server";
import prisma from "../../lib/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }
    const email = session.user?.email;
    if (email) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user || user.role !== "ADMIN") {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401})
        } else {
            return new NextResponse(
                JSON.stringify({users: await prisma.user.findMany()}),
                {
                    status: 200,
                },
            );
        }
    }
}
