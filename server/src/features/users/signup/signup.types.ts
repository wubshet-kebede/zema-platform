import { z } from "zod";
import { registerSchema } from "./signup.schema.js";
export type SignupInput = z.infer<typeof registerSchema>["body"];
export interface SignupResult {
  user: {
    id: string;
    email: string;
    username: string;
    displayName: string;
    accStatus: string;
    role: string;
    bio: string;
    avatarUrl: string;
  };
}
