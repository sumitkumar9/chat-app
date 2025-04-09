import { ObjectId } from "mongoose";
import { userSocketIds } from "../app";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";

export const emitEvent = (req, event, users, data) => {
    
}

export const getOtherMember = (members: {_id: ObjectId, name: string}[], userId: string) => {
    return members.find((member) => member._id.toString() !== userId.toString());
}

export const uploadFilesInCloudinary = async (files: string[]) => {
    const uploadPromises = files.map((file) => {
        return cloudinary.uploader.upload(file, {
            resource_type: "auto",
            public_id: uuid(),
            folder: "chat-app",
        })
    });
    try {
        return await Promise.all(uploadPromises);
    } catch (error) {
        throw error; 
    }
}

export const deleteFilesFromCloudinary = async (publicIds: string[]) => {
    
}

export const getSockets = (users) => {
    return users.map((user) => userSocketIds.get(user._id.toString()));
}
