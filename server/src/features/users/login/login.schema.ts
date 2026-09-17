import { z } from "zod";
export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ message: "Email is required" })
      .trim()
      .email("Invalid email address format")
      .transform((val) => val.toLowerCase()),
    password: z
      .string({ message: "Password is required" })
      .min(1, "Password cannot be empty"),
  }),
});
export type LoginInput = z.infer<typeof loginSchema>["body"];
