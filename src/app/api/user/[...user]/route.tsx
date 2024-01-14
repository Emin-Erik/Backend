import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { $Enums } from ".prisma/client";
import Role = $Enums.UserRole;

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const email = session.user?.email;
  if (email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      const id = req.nextUrl.searchParams.get("id") as string;
      return new NextResponse(
        JSON.stringify({
          user: await prisma.user.findUnique({
            where: {
              id,
            },
          }),
        }),
        {
          status: 200,
        },
      );
    }
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const email = session.user?.email;
  if (email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      const id = req.nextUrl.searchParams.get("id") as string;
      const email = req.nextUrl.searchParams.get("email") as string;
      const name = req.nextUrl.searchParams.get("name") as string;
      const role = req.nextUrl.searchParams.get("role") as Role;

      const updateData: Record<string, string | Role> = {};
      if (email) updateData.email = email;
      if (name) updateData.name = name;
      if (role) updateData.role = role;

      return new NextResponse(
        JSON.stringify({
          user: await prisma.user.updateMany({
            where: {
              id,
            },
            data: updateData,
          }),
        }),
        {
          status: 200,
        },
      );
    }
  }
}
