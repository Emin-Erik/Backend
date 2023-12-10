import { z } from "zod";

export const FormDataSchema = z
  .object({
    Name: z.string().min(1, "Deine Name wird benötigt"),
    Password: z
      .string()
      .min(8, "Dein Passwort muss mind. 8 Zeichen lang sein")
      .regex(
        /[A-Z]/,
        "Das Passwort muss mindestens einen Großbuchstaben enthalten"
      )
      .regex(/[0-9]/, "Das Passwort muss mindestens eine Zahl enthalten"),
    confirmPassword: z
      .string()
      .min(8, "Dein Passwort muss mind. 8 Zeichen lang sein"),
    Email: z
      .string()
      .min(1, "Eine Email Adresse wird benötigt")
      .email("Unügltige Email Adresse"),
    Geschlecht: z.string().min(1, "Eine Geschlechtsangabe wird benötigt"),
    Gewicht: z.string().min(1, "Eine Geschlechtsangabe wird benötigt"),
    Groeße: z.string().min(1, "Eine Größenangabe wird benötigt"),
    Plan: z.string().min(1, "Ein Plan muss ausgewählt werden"),
    Aktivitaet: z.string().min(1, "Ein Aktivitätslevel muss angegeben werden"),
  })
  .refine((data) => data.Password === data.confirmPassword, {
    message: "Passwörter sind nicht gleich, diese müssen übereinstimmen",
    path: ["confirmPassword"],
  });
