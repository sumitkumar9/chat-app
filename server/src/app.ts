import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import { v4 as uuid } from 'uuid';
import { config } from "dotenv";
config();

import { MYSQL_CONNECTION } from "./config/database_mysql";
import { userRouter } from './routes/user';
import { chatRouter } from "./routes/chat";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './utils/constant';
import { getSockets } from './utils/features';
import { Message } from './models/mongodb/message';


// Extend the Request interface to include the 'user' property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const app = express();
const PORT = 4000;

const server = createServer(app);

const io = new Server(server); 

export const userSocketIds = new Map();

app.use(express.json());
app.use(cookieParser());

function handleValidationError() {

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }
    if (!process.env.DB_INSTANCE) {
        throw new Error("DB_INSTANCE must be defined");
    }
    if (!process.env.DB_USERNAME) {
        throw new Error("DB_USERNAME must be defined");
    }
    if (!process.env.DB_PASSWORD) {
        throw new Error("DB_PASSWORD must be defined");
    }
    if (!process.env.DB_HOST) {
        throw new Error("DB_HOST must be defined");
    }
    if (!process.env.DB_TYPE) {
        throw new Error("DB_TYPE must be defined");
    }
    if (!process.env.DB_TIMEZONE) {
        throw new Error("DB_TIMEZONE must be defined");
    }
}

async function connectDatabase() {
    mongoose.set("strictQuery", true);
    mongoose.set("toJSON", { flattenMaps: false });
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "chat"
    });

    console.log("Connected to MongoDB successfully.");
    await MYSQL_CONNECTION.authenticate();
    console.log("Connected to MySQL successfully.");
}

function init() {
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

async function main() {
    try {
        handleValidationError();
        await connectDatabase();
        init();
    } catch (err) {
        console.error("Failed to start server:", err);
    }
}


// routes

app.use('/user', userRouter);
app.use('/chat', chatRouter);


// Socket.io connection
io.use((socket, next) => {

});

io.on('connection', (socket) => {
    const user = {
        _id: "sss",
        name: "John Doe",
    }

    userSocketIds.set(user._id.toString(), socket.id);
    console.log('A user connected:', socket.id);

    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
        
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        }

        const membersSocket = getSockets(members)
        console.log(membersSocket);
        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime
        });
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId })

        try {
            await Message.create({
                content: message,
                sender: user._id,
                chat: chatId,
            });
        } catch (error) {
            console.log(error);
        }
    })

    console.log(userSocketIds);
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        userSocketIds.delete(user._id.toString());
    });

    // Handle other socket events here
});


// chat application

main();
