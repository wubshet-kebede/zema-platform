import { z } from "zod";
import { loginSchema } from "./login.schema.js";
export type LoginInput = z.infer<typeof loginSchema>["body"];
export interface LoginResult {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
    accStatus: string;
  };
}
