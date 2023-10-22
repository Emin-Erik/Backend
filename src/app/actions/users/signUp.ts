"use server";

import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../emails/sendEmail";
import { useRouter } from "next/navigation";
import { VerifyEmailEmailTemplate } from "@/app/email-templates/verify-email-email";

export const signUp = async (
  email: string,
  username: string,
  password: string
) => {
  const usermail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (usermail) {
    return "User with that email already exists.";
  }

  if (user) {
    return "User with that username already exists.";
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
    },
  });

  const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

  await prisma.user.update({
    where: {
      id: createdUser.id,
    },
    data: {
      emailVerificationToken: emailVerificationToken,
    },
  });

  await sendEmail({
    from: "Admin <info@web.axiom-me.com>",
    to: [email],
    subject: "Verify email",
    react: VerifyEmailEmailTemplate({
      email,
      emailVerificationToken,
    }) as React.ReactElement,
  });

  return "Successfully created new user!";
};