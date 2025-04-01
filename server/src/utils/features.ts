import { ObjectId } from "mongoose";
import { userSocketIds } from "../app";

export const emitEvent = (req, event, users, data) => {
    
}

export const getOtherMember = (members: {_id: ObjectId, name: string}[], userId: string) => {
    return members.find((member) => member._id.toString() !== userId.toString());
}


export const deleteFilesFromCloudinary = async (publicIds: string[]) => {
    
}

export const getSockets = (users) => {
    return users.map((user) => userSocketIds.get(user._id.toString()));
}
