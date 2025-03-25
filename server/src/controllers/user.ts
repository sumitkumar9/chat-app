import { Request, Response } from 'express';
import { User } from '../models/mongodb/user';
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { createAccessToken } from '../utils/json-web-token';

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