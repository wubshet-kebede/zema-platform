import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z
      .string({ message: "Username is required" })
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(10, "Username cannot exceed 10 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),
    email: z
      .string({ message: "Email is required" })
      .trim()
      .email("Invalid email address format")
      .transform((val) => val.toLowerCase()),
    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password cannot exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    displayName: z
      .string({ message: "Display name is required" })
      .trim()
      .min(2, "Display name must be at least 2 characters")
      .max(50, "Display name cannot exceed 50 characters"),
    bio: z.string().max(250).optional(),
  }),
});
export type RegisterInput = z.infer<typeof registerSchema>["body"];
