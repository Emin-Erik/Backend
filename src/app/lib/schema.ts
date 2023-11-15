import { z } from 'zod'

export const FormDataSchema = z.object({
  Name: z.string().min(1, 'Deine Name wird benötigt'),
  Password: z.string().min(8, 'Dein Passwort muss mind. 8 Zeichen lang sein'),
  Email: z.string().min(1, 'Eine Email Adresse wird benötigt').email('Invalid email address'),
  Geschlecht: z.string().min(1, 'Country is required'),
  Gewicht: z.string().min(1, 'Street is required'),
  Groeße: z.string().min(1, 'City is required'),
  Plan: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required')
})
