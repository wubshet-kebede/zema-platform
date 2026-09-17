import { model } from "mongoose";
import { type IRefreshTokenDocument } from "./refresh-token.types.js";
import { refreshTokenSchema } from "./refresh-token.schema.js";

export const RefreshToken = model<IRefreshTokenDocument>(
  "RefreshToken",
  refreshTokenSchema,
);
