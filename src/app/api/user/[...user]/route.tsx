import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../lib/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {$Enums} from ".prisma/client";
import Role = $Enums.Role;


export async function GET(req: NextRequest) {
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
            const id = req.nextUrl.searchParams.get("id") as string;
            return new NextResponse(
                JSON.stringify({
                    user: await prisma.user.findUnique({
                        where: {
                            id,
                        },
                    })
                }),
                {
                    status: 200,
                },
            );
        }
    }
}

export async function PUT(req: NextRequest) {
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
            const id = req.nextUrl.searchParams.get("id") as string;
            const email = req.nextUrl.searchParams.get("email") as string;
            const username = req.nextUrl.searchParams.get("username") as string;
            const role = req.nextUrl.searchParams.get("role") as Role;
            return new NextResponse(
                JSON.stringify({
                    user: await prisma.user.updateMany({
                        where: {
                            id,
                        },
                        data: {
                            username: username,

                            email: email,
                            role: role,
                        }

                    })
                }),
                {
                    status: 200,
                },
            );
        }
    }
}
