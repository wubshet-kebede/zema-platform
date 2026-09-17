import jwt, { type SignOptions } from "jsonwebtoken";
import crypto from "crypto";

const ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "dev_access_secret_change_in_prod";
const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "dev_refresh_secret_change_in_prod";

export interface TokenPayload {
  userId: string;
  role: string;
}

export interface RefreshTokenPayload extends TokenPayload {
  family: string;
}

export interface GeneratedRefreshToken {
  rawToken: string;
  tokenHash: string;
  family: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: "15m" };
  return jwt.sign(payload, ACCESS_SECRET, options);
};

export const generateRefreshToken = (
  payload: TokenPayload,
  existingFamily?: string,
): GeneratedRefreshToken => {
  const family = existingFamily || crypto.randomUUID();
  const options: SignOptions = { expiresIn: "7d" };

  const rawToken = jwt.sign({ ...payload, family }, REFRESH_SECRET, options);
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  return { rawToken, tokenHash, family };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, REFRESH_SECRET) as RefreshTokenPayload;
};
