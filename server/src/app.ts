import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import { MYSQL_CONNECTION } from "./config/database_mysql";
import { userRouter } from './routes/user';

const app = express();
const PORT = 4000;

const server = createServer(app);

const io = new Server(server); 

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

app.get('/', async (req, res) => {
    try {
        // const message = await Message.find();
        // res.send(message);

        res.sendFile('D:/Non/Chat-app/src/view/index.html');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// let client = 0;
// let roomno = 1;
// io.on('connection', (socket) => {

//     client++;

//     console.log('a user connected');
//     // setTimeout(() => {
//     //     socket.emit('testEvent', { description: 'A custom event named testEvent has been emitted' });
//     // }, 4000);
//     // socket.on('testEvent2', (data) => {
//     //     console.log("testEvent2: ", data)
//     // });

//     // broadcast to all clients
//     // io.sockets.emit('broadcast', { description: client + ' clients connected!' });
//     // socket.emit('newClientConnect', { description: 'Welcome to the chat!' });
//     // socket.broadcast.emit('newClientConnect', { description: client + ' clients connected!' });

//     // joining a room 
//     socket.join('room-' + roomno);
//     io.sockets.in('room-' + roomno).emit('connectToRoom', { description: 'You are in room no. ' + roomno });

//     // disconnecting from a room
//     socket.on('disconnect', function () {
//         client--;
//         // io.sockets.emit('broadcast', { description: client + ' clients connected!' });
//         // socket.broadcast.emit('newClientConnect', { description: client + ' clients connected!' });
//         console.log('A user disconnected');
//     });
// });


// chat application

const users = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('setUsername', (data) => {
        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        } else {
            users.push(data);
            socket.emit('userSet',  { username: data });
        }
    });

    socket.on('msg', function(data){
        //Send message to everyone
        io.sockets.emit('newmsg', data);
    })
});

main();
