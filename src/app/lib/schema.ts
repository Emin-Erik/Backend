import { z } from "zod";

export const FormDataSchema = z
  .object({
    Name: z.string().min(1, "Deine Name wird benötigt"),
    Password: z.string().min(8, "Dein Passwort muss mind. 8 Zeichen lang sein"),
    confirmPassword: z
      .string()
      .min(8, "Dein Passwort muss mind. 8 Zeichen lang sein"),
    Email: z
      .string()
      .min(1, "Eine Email Adresse wird benötigt")
      .email("Invalid email address"),
    Geschlecht: z.string().min(1, "Geschlecht is required"),
    Gewicht: z.string().min(40, "Gewicht is required"),
    Groeße: z.string().min(150, "Groeße is required"),
    Plan: z.string().min(1, "Plan is required"),
    Aktivitaet: z.string().min(1, "Aktivitaet is required"),
  })
  .refine((data) => data.Password === data.confirmPassword, {
    message: "Passwörter müssen übereinstimmen",
    path: ["confirmPassword"],
  });
