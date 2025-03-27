import { Schema, model, Document } from "mongoose";

interface IMessage extends Document {
  chat: string;
  sender: string;
  content: string;
  reactions: Array<{ user_id: string; reaction: string }>;
  attachments: {
    public_id: string;
    url: string;
  }[];
}

const messageSchema = new Schema<IMessage>(
  {
    chat: { type: String, required: true, ref: "Chat" },
    sender: { type: String, required: true, ref: "User" },
    content: { type: String },
    attachments: [{
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    }],
    reactions: [{ user_id: String, reaction: String }],
  },
  { timestamps: true }
);

export const Message = model<IMessage>("Message", messageSchema);
