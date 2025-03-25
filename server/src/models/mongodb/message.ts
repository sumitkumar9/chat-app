import { Schema, model, Document } from "mongoose";

interface IMessage extends Document {
  chat_id: string;
  sender_id: string;
  message_type: string;
  content: string;
  reactions: Array<{ user_id: string; reaction: string }>;
  attachments: {
    public_id: string;
    url: string;
  };
}

const messageSchema = new Schema<IMessage>(
  {
    chat_id: { type: String, required: true, ref: "Chat" },
    sender_id: { type: String, required: true, ref: "User" },
    message_type: { type: String, required: true },
    content: { type: String },
    attachments: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    reactions: [{ user_id: String, reaction: String }],
  },
  { timestamps: true }
);

export const Message = model<IMessage>("Message", messageSchema);
