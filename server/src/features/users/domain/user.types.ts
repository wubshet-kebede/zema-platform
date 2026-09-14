import { Document, Model, Types } from "mongoose";

import { type AccountStatus, type UserRole } from "./user.constants.js";

export interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  accStatus: AccountStatus;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  likedSongs: Types.ObjectId[];
  emailVerifiedAt?: Date | null;
  passwordChangedAt?: Date | null;
  lastLoginAt?: Date | null;
  suspendedAt?: Date | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type IUserModel = Model<IUserDocument>;
