import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
    chat_id: string;
    sender_id: string;
    message_type: string;
    content: string;
    status: string;
    reactions: Array<{ user_id: string, reaction: string }>;
    created_at: Date;
    updated_at: Date;
}

const messageSchema = new Schema<IMessage>({
    chat_id: { type: String, required: true },
    sender_id: { type: String, required: true },
    message_type: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, required: true },
    reactions: [{ user_id: String, reaction: String }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Message = model<IMessage>('Message', messageSchema);
