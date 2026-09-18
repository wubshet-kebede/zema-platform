import { User } from "../domain/user/user.model.js";
import { AppError } from "../../../shared/errors/app.error.js";

export const meService = {
  async execute(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      accStatus: user.accStatus,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      likedSongs: user.likedSongs,
      emailVerifiedAt: user.emailVerifiedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
};
