import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../lib/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";

export async function DELETE(req: NextRequest) {
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

            if (!id) {
                return new NextResponse(
                    JSON.stringify({error: "Missing 'id' parameter in the URL"}),
                    {
                        status: 400, // Bad Request
                    },
                );
            }

            // Try to delete the user with the given id
            try {
                const deletedUser = await prisma.user.delete({
                    where: {
                        id,
                    },
                });

                // If the user was deleted successfully, return a success response
                if (deletedUser) {
                    return new NextResponse(
                        JSON.stringify({
                            message: `User with id ${id} deleted successfully`,
                            deletedUser,
                        }),
                        {
                            status: 200,
                        },
                    );
                }

                // If the user was not found, return an error response
                else {
                    return new NextResponse(JSON.stringify({error: "User not found"}), {
                        status: 404, // Not Found
                    });
                }
            } catch (error) {
                // If something went wrong deleting the user, return an error response
                return new NextResponse(
                    JSON.stringify({error: "Failed to delete user"}),
                    {
                        status: 500, // Internal Server Error
                    },
                );
            }
        }
    }
}
