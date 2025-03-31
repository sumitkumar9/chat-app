import { Request, Response } from 'express';
import { User, UserAtrr } from '../models/mongodb/user';
import { Request as UserRequest } from '../models/mongodb/request';
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { createAccessToken } from '../utils/json-web-token';
import { Chat } from '../models/mongodb/chat';
import { emitEvent } from '../utils/features';
import { NEW_REQUEST, REFECTCH_CHATS } from '../utils/constant';

export const login = async (req: Request, res: Response) => {
  // User login logic

    try{
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select({ password: 1, username: 1 });

      if (!user ) {
        return res.status(400).json({message: "Invalid credentials"});
      }

      if (!comparePassword(password, user.password)) {
        return res.status(200).json({message: "Invalid credentials"});
      }

      const accessToken = createAccessToken({_id: user._id.toString(), username: user.username, email: user.email })

      return res.status(200)
              .cookie('accessToken', accessToken, { httpOnly: true, secure: true, maxAge: 30 * 60 * 1000 })
              .json({message: "User login successful"});
    } catch (error) {
      return res.status(500).json({message: "Something went wrong", error: error.message});
    }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body;

    const userExists = await User.findOne({ $or: [{ username}, { email }]});

    if (userExists) {
      return res.status(400).json({message: "user already exists"});
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword
    })

    return res.status(201).json(user);
    
  } catch (error) {
    return res.status(500).json({message: "Something went wrong", error: error.message});
  }
}

export const searchUser = async (req: Request, res: Response) => {
  try {
    const { name = "" } = req.query;

    const myChat = await Chat.find({ members: req.user._id, groupChat: false }).select({members: 1});

    const allUsersFromMyChat = myChat.flatMap((chat) => chat.members);

    const allUsersExecptMeandMyFriends = await User.find({ name: { $regex: name, $options: "i" }, _id: { $nin: allUsersFromMyChat }}).select({ password: 0 });

    const users = allUsersExecptMeandMyFriends.map(({ _id, name, avatar }) => {
      return {
        _id,
        name,
        avatar: avatar.url
      }
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({message: "Something went wrong", error: error.message});
  }
}

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {

    const { userId } = req.body;
    const request = await UserRequest.findOne({
      $or: [
        { sender: req.user._id, receiver_id: userId },
        { sender: userId, receiver_id: req.user._id }
      ]
    });

    if (request) {
      return res.status(400).json({message: "Request Already sent"});
    }

    await UserRequest.create({
      sender: req.user._id,
      receiver: userId
    })

    emitEvent(req, NEW_REQUEST, [userId], "Request");

    return res.status(200).json({message: "Request sent successfully"});
  } catch (error) {
    return res.status(500).json({message: "Something went wrong", error: error.message});
  }
}

export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { requestId, accept = false } = req.body;

    const request = await UserRequest.findById(requestId)
      .populate<{sender: UserAtrr}>("sender", "name")
      .populate<{receiver: UserAtrr}>("receiver", "name");

    if (!request) {
      return res.status(400).json({message: "Request not found"});
    }

    if (request.receiver._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({message: "You are not authorized"});

    }

    if (!accept) {
      await request.deleteOne();
      return res.status(200).json({message: "Request rejected"});
    }



    await Chat.create({
      chatName: `${request.sender.name}-${request.receiver.name}`,
      members: [request.sender, request.receiver],
      groupChat: false
    });

    await UserRequest.findByIdAndDelete(requestId);

    emitEvent(req, REFECTCH_CHATS, [request.sender, request.receiver], "Request Accepted");

    return res.status(200).json("Request accepted successfully");
  } catch (error) {
    return res.status(500).json({message: "Something went wrong", error: error.message});
  }
}

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const requests = await UserRequest.find({ receiver: req.user._id })
      .populate<{sender: UserAtrr}>("sender", "name avatar");

    
    const allRequests = requests.map(({ _id, sender }) => {
      return {
        _id,
        sender: {
          name: sender.name,
          avatar: sender.avatar.url
        }
      }
    })

    return res.status(200).json(allRequests);
  } catch (error) {
    return res.status(500).json({message: "Something went wrong", error: error.message});
  }
}