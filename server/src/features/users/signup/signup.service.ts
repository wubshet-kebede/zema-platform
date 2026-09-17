import { User } from "../domain/user/index.js";
import { AppError } from "../../../shared/errors/app.error.js";
import { PasswordHash } from "../../../shared/utils/password.util.js";

import type { SignupInput, SignupResult } from "./signup.types.js";

export const signupService = {
  async execute(input: SignupInput): Promise<SignupResult> {
    const { username, email, password, displayName, bio, avatarUrl } = input;
    const usernameNormalized = username.trim().toLowerCase();
    const emailNormalized = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      $or: [{ username: usernameNormalized }, { email: emailNormalized }],
    });

    if (existingUser) {
      if (existingUser.username === usernameNormalized) {
        throw new AppError("Username is already taken", 409, "USERNAME_EXISTS");
      }

      throw new AppError("Email is already registered", 409, "EMAIL_EXISTS");
    }

    const passwordHash = await PasswordHash.hash(password);

    const user = await User.create({
      username: usernameNormalized,
      email: emailNormalized,
      passwordHash,
      displayName,
      ...(bio !== undefined && { bio }),
      ...(avatarUrl !== undefined && { avatarUrl }),
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        accStatus: user.accStatus,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
      },
    };
  },
};
