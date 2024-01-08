"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/app/lib/db";
import { RegisterSchema } from "@/app/lib/schema";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/app/lib/mail";
import { generateVerificationToken } from "@/app/lib/tokens";

export const signUp = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, height, activity, plan, weight, gender } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      height,
      activity,
      plan,
      gender,
      weight,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  return { success: "Confirmation email sent!" };
};
