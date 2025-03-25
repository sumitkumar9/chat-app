import { Schema, model, Document, Types } from "mongoose";
import { UserAtrr } from "./user";

interface ChatAttr extends Document {
  name: string;
  groupChat: boolean;
  createdBy: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema(
  {
    name: { type: String, required: true },
    groupChat: { type: Boolean, default: false },
    createdBy: { type: Types.ObjectId, required: true, ref: "User" },
    members: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Chat = model<ChatAttr>("Chat", chatSchema);
