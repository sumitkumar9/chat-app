import { ObjectId } from "mongoose";

export const emitEvent = (req, event, users, data) => {
    
}

export const getOtherMember = (members: {_id: ObjectId, name: string}[], userId: string) => {
    return members.find((member) => member._id.toString() !== userId.toString());
}