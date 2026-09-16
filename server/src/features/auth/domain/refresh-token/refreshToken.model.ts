import { model } from "mongoose";
import { type IRefreshTokenDocument } from "./refreshToken.types.js";
import { refreshTokenSchema } from "./refreshToken.schema.js";

export const RefreshToken = model<IRefreshTokenDocument>(
  "RefreshToken",
  refreshTokenSchema,
);
