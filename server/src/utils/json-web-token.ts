import { sign } from "jsonwebtoken";

interface TokenPayload {
    _id: string;
    username: string;
    email: string;
}

export const createAccessToken = (user: TokenPayload) => {
    return sign(user, process.env.JWT_SECRET, { expiresIn: '30m' });
}
