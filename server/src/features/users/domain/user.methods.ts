import argon2 from "argon2";
import { userSchema } from "./user.schema.js";
import { type IUserDocument } from "./user.types.js";

userSchema.pre<IUserDocument>("save", async function () {
  if (!this.isModified("passwordHash")) {
    return;
  }

  this.passwordHash = await argon2.hash(this.passwordHash, {
    type: argon2.argon2id,
  });
});

userSchema.methods.comparePassword = async function (
  this: IUserDocument,
  candidatePassword: string,
): Promise<boolean> {
  try {
    return await argon2.verify(this.passwordHash, candidatePassword);
  } catch (_error) {
    return false;
  }
};
