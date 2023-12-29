"use server";

import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../emails/sendEmail";
import { VerifyEmailEmailTemplate } from "@/app/email-templates/verify-email-email";

export const signUp = async (
    name: string,
    height: string,
    email: string,
    password: string,
    geschlecht: string,
    gewicht: string,
    akitvitaet: string,
    plan: string
) => {
  const usermail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (usermail) {
    return "User with that email already exists.";
  }


  const passwordHash = bcrypt.hashSync(password, 10);

  const createdUser = await prisma.user.create({
    data: {
        name,
        height,
        email,
        passwordHash,
        geschlecht,
        gewicht,
        akitvitaet,
        plan
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
