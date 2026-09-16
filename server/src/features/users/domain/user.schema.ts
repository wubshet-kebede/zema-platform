import { Schema } from "mongoose";
import { type IUserDocument, type IUserModel } from "./user.types.js";
import {
  DEFAULT_USER_ROLE,
  DEFAULT_ACCOUNT_STATUS,
  USER_ROLES,
  ACCOUNT_STATUSES,
} from "./user.constants.js";

export const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],

      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [10, "Username cannot exceed 10 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],

      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      required: true,
      default: DEFAULT_USER_ROLE,
    },
    accStatus: {
      type: String,
      enum: ACCOUNT_STATUSES,
      default: DEFAULT_ACCOUNT_STATUS,
      required: true,
    },
    displayName: {
      type: String,
      required: [true, "Display name is required"],
      trim: true,
      maxlength: [50, "Display name cannot exceed 50 characters"],
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: [250, "Bio cannot exceed 250 characters"],
      default: "",
    },
    likedSongs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    emailVerifiedAt: {
      type: Date,
      default: null,
    },

    passwordChangedAt: {
      type: Date,
      default: null,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

    suspendedAt: {
      type: Date,
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        const { passwordHash, __v, ...cleanUser } = ret;
        return cleanUser;
      },
    },
  },
);
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ accStatus: 1 });
