import { Request, Response } from 'express';
import { Chat } from "../models/mongodb/chat";
import { emitEvent } from "../utils/features";
import { ALERT, REFECTCH_CHATS } from "../utils/constant";
import { User, UserAtrr } from '../models/mongodb/user';

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
