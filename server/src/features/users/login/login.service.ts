import { User } from "../domain/user/index.js";
import { RefreshToken } from "../domain/refresh-token/index.js";
import { AppError } from "../../../shared/errors/app.error.js";
import { PasswordHash } from "../../../shared/utils/password.util.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt.util.js";

import type { LoginInput, LoginResult } from "./login.types.js";

export const loginService = {
  async execute(input: LoginInput): Promise<LoginResult> {
    const { email, password } = input;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+passwordHash");

    if (!user) {
      throw new AppError(
        "Invalid email or password",
        401,
        "INVALID_CREDENTIALS",
      );
    }

    if (user.accStatus === "suspended") {
      throw new AppError("Your account is suspended", 403, "ACCOUNT_SUSPENDED");
    }

    if (user.accStatus === "deleted") {
      throw new AppError(
        "This account has been deleted",
        403,
        "ACCOUNT_DELETED",
      );
    }

    const passwordMatches = await PasswordHash.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new AppError("Invalid password", 401, "INVALID_CREDENTIALS");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    const {
      rawToken: refreshToken,
      tokenHash,
      family,
    } = generateRefreshToken({
      userId: user.id,
      role: user.role,
    });

    await RefreshToken.create({
      userId: user._id,
      tokenHash,
      family,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    user.lastLoginAt = new Date();
    await user.save();

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        accStatus: user.accStatus,
      },
    };
  },
};
