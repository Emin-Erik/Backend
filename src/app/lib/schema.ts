import { z } from "zod";

export const FormDataSchema = z
  .object({
    name: z.string().min(1, "Deine Name wird benötigt"),
    password: z
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
    email: z
      .string()
      .min(1, "Eine Email Adresse wird benötigt")
      .email("Unügltige Email Adresse"),
    geschlecht: z.string().min(1, "Eine Geschlechtsangabe wird benötigt"),
    gewicht: z.string().min(1, "Eine Geschlechtsangabe wird benötigt"),
    groeße: z.string().min(1, "Eine Größenangabe wird benötigt"),
    plan: z.string().min(1, "Ein Plan muss ausgewählt werden"),
    zeit: z.string().min(1, "Ein Aktivitätslevel muss angegeben werden"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter sind nicht gleich, diese müssen übereinstimmen",
    path: ["confirmPassword"],
  });
