import { z } from "zod";

export interface LoginFormData {
  email: string;
  password: string;
}

export const registerSchema = z.object({
  name: z.string().min(2, "Insira um nome."),
  email: z.email("Email inválido."),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .regex(/[0-9]/, "A senha deve ter pelo menos um número"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
