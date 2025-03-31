import { Request, Response } from 'express';
import { Chat } from "../models/mongodb/chat";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features";
import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFECTCH_CHATS } from "../utils/constant";
import { User, UserAtrr } from '../models/mongodb/user';
import { Message } from '../models/mongodb/message';

export const newGroup = async (req: Request, res: Response) => {
    const { name, members } = req.body;
    try {

        if (members.length < 2) {
            return res.status(400).json({ message: "Group members must be more than 2" });
        }

        const allMembers = [...members, req.user._id]; // req.user._id,

        await Chat.create({
            name,
            groupChat: true,
            createdBy: req.user._id,
            members: allMembers,
        });

        emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
        emitEvent(req, REFECTCH_CHATS, members, '');

        return res.status(201).json({ message: "Group created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const getMyChats = async (req: Request, res: Response) => {
    try {
        const chats = await Chat.find({ members: req.user._id }).populate<{members: UserAtrr[]}>('members', 'name avatar');


        const transformedChats = chats.map(({_id, groupChat, name, createdBy, members, createdAt, updatedAt }) => {
            const otherMember = members.find((member) => member._id.toString() !== req.user._id.toString());
            return {
                _id: _id,
                groupChat,
                name: groupChat ? name : otherMember.name,
                createdBy,
                members: members.reduce((acc, member) => {
                    if (member._id.toString() !== req.user._id.toString()) {
                        acc.push(member._id);
                    }
                    return acc;
                }, []),
                createdAt,
                updatedAt
            }
        })
        return res.status(200).json(transformedChats);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const getMyGroup = async (req: Request, res: Response) => {
    try {
        const groups = await Chat.find({ members: req.user._id, groupChat: true }).populate<{members: UserAtrr[]}>('members', 'name avatar');

        // trnasform for avatar
        return res.status(200).send(groups);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const addMembers = async (req: Request, res: Response) => {
    try {
        const { chatId, members } = req.body;

        if (!members || !members.length) {
            return res.status(400).json({ message: "Please provide memebers" });
        }

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        if (chat.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not allowed to add members to this group" });
        }

        const uniqueMembers = members.filter((i: string) => !chat.members.includes(i));

        const newMembersPromise = uniqueMembers.map((i: string) => User.findById(i, "name"));

        const newMembers = await Promise.all(newMembersPromise);

        chat.members.push(...newMembers.map((i) => i._id));
        await chat.save();

        const allUsersName = newMembers.map((i) => i.name).join(", ");

        emitEvent(req, ALERT, chat.members, `${allUsersName} has been added to the group`);
        emitEvent(req, REFECTCH_CHATS, chat.members, '');

        return res.status(200).json({ message: "Members added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

export const leaveGroup = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.params;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        if (!chat.groupChat) {
            return res.status(400).json({ message: "This is not a group chat" });
        }

        const remaingMembers = chat.members.filter((member) => member.toString() !== req.user._id.toString());

        if (chat.createdBy.toString() === req.user._id.toString()) {
            chat.createdBy = remaingMembers[0];
        }

        chat.members = remaingMembers;

        const [user] = await Promise.all([User.findById(req.user._id, "name"), chat.save()]);

        emitEvent(req, ALERT, chat.members, `${user.name} has left the group`);

        return res.status(200).json({ message: "You have left the group" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const sendAttachments = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.body;

        const [chat, user] = await Promise.all([Chat.findById(chatId), User.findById(req.user._id, "name")]);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        const files = req.files || [];
        if (!files.length) {
            return res.status(400).json({ message: "Please provide attachment" });
        }

        // upload files here

        const attachments = [];

        const messageForDb = {
            content: "",
            attachments: attachments,
            sender: user._id,
            chat: chatId,
        };

        const messageForRealTime = {
            ...messageForDb,
            sender: {
                _id: user._id,
                name: user.name,
            },
        };

        const message = await Message.create(messageForDb);

        emitEvent(req, NEW_ATTACHMENT, chat.members, {
            message: messageForRealTime,
            chatId
        });

        emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });
        return res.status(201).json({ message });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const getChatDetails = async (req: Request, res: Response) => {
    const { chatId } = req.params;
    try {
        const chat = await Chat.findById(chatId).populate<{members: UserAtrr[]}>('members', 'name avatar');

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        const transformedMembers = chat.members.map((member) => {
            return {
                _id: member._id,
                name: member.name,
                avatar: member.avatar.url,
            };
        });

        return res.status(200).json({ ...chat.toObject(), members: transformedMembers });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const renameGroup = async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { name } = req.body;
    try {
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        if (!chat.groupChat) {
            return res.status(400).json({ message: "This is not a group chat" });
        }

        chat.name = name;
        await chat.save();

        emitEvent(req, ALERT, chat.members, `Group name has been changed to ${name}`);
        emitEvent(req, REFECTCH_CHATS, chat.members, '');

        return res.status(200).json({ message: "Group name changed successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const deleteChat = async (req: Request, res: Response) => {
    const { chatId } = req.params;
    try {
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        if (chat.groupChat && chat.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not allowed to delete this chat" });
        }

        const memebers = chat.members;

        // delete messages 

        const messagesWithAttachments = await Message.find({ chat: chatId, attachments: { $exists: true, $ne: [] } });

        const public_ids = [];

        messagesWithAttachments.forEach(({ attachments }) => {
            attachments.forEach(({ public_id }) => {
                public_ids.push(public_id);
            })
        })

        await Promise.all([Message.deleteMany({ chat: chatId }),    await chat.deleteOne(), deleteFilesFromCloudinary(public_ids)]);

        emitEvent(req, REFECTCH_CHATS, memebers, '');

        return res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const getMessages = async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * 20;
    try {
        const [messages, totalMessageCount] = await Promise.all([Message.find({ chat: chatId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(20)
            .populate<{sender: UserAtrr}>('sender', 'name'), Message.countDocuments({ chat: chatId })]);

        return res.status(200).json({ message: messages.reverse(), total: totalMessageCount});
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}