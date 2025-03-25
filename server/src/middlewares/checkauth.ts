import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: "Invalid access token" });
    }

    let decoded: any;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ message: "Invalid access token" });
    }
    next();
}
