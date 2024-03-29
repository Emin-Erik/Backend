import { z } from "zod";
import { UserRole } from "@prisma/client";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Deine Name wird benötigt"),
    password: z
      .string()
      .min(8, "Dein Passwort muss mind. 8 Zeichen lang sein")
      .regex(
        /[A-Z]/,
        "Das Passwort muss mindestens einen Großbuchstaben enthalten",
      )
      .regex(/[0-9]/, "Das Passwort muss mindestens eine Zahl enthalten"),
    confirmPassword: z
      .string()
      .min(8, "Dein Passwort muss mind. 8 Zeichen lang sein"),
    email: z
      .string()
      .min(1, "Eine Email Adresse wird benötigt")
      .email("Unügltige Email Adresse"),
    gender: z.string().min(1, "Eine Geschlechtsangabe wird benötigt"),
    weight: z.string().min(1, "Eine Geschlechtsangabe wird benötigt"),
    height: z.string().min(1, "Eine Größenangabe wird benötigt"),
    plan: z.string().min(1, "Ein Plan muss ausgewählt werden"),
    activity: z.string().min(1, "Ein Aktivitätslevel muss angegeben werden"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter sind nicht gleich, diese müssen übereinstimmen",
    path: ["confirmPassword"],
  });

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      return !(data.password && !data.newPassword);
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      return !(data.newPassword && !data.password);
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});
