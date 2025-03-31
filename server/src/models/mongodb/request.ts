import { Schema, model, Document, Types } from "mongoose";

export enum STATUS {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

const requestSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: [STATUS.PENDING, STATUS.ACCEPTED, STATUS.REJECTED],
      default: STATUS.PENDING,
    },
    sender: { type: Types.ObjectId, required: true, ref: "User" },
    receiver: { type: Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

export const Request = model("Request", requestSchema);
