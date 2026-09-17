import { model } from "mongoose";
import { userSchema } from "./user.schema.js";
import { type IUserDocument, type IUserModel } from "./user.types.js";

export const User = model<IUserDocument, IUserModel>("User", userSchema);

export * from "./user.types.js";
