import { Schema, model, Document } from "mongoose";

export interface UserAtrr extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const User = model<UserAtrr>("User", userSchema);
