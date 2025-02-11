import express from "express";
import userRouter from "./routes/user.routes.js";
import ambulanceRouter from "./routes/ambulance.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server as SocketServer } from 'socket.io'; // import the server part of socket.io
import http from 'http';
import AppError from "./utils/appError.js";


const app = express();
const server = http.createServer(app);

const allowedOrigins = process.env.CORS_ORIGIN.split(",") // split the string by comma and store in array

app.use(
    cors({
        origin: allowedOrigins, // only the url of cors origin is allowed and pass allowedOrigins
        credentials: true,
    })
)

const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

// Listen for socket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('ambulanceLocation', (data) => {
        console.log("Ambulance location: ", data);
        io.emit('ambulanceLocation', data);
    });
    socket.on('fireLocation', (data) => {
        console.log("fireLocation location: ", data);
        io.emit('fireLocation', data);
    });

    socket.on("bookAmbulance", (data) => {
        console.log("Book ambulance data: ", data)
        io.emit("bookAmbulance", data)
    });

    socket.on("bookFire", (data) => {
        console.log("Book fire data: ", data)
        io.emit("bookFire", data)
    })


    socket.on("decision", (data) => {
        console.log("decision: ", data)
        io.emit("decision", data)
    })
    socket.on("firedecision", (data) => {
        console.log("firedecision: ", data)
        io.emit("firedecision", data)
    })
    // Listen for custom events from the client
    socket.on('message', (data) => {
        console.log('Message from client:', data);
        // Broadcast to all clients except the sender
        socket.broadcast.emit('message', data);
    });

    // Handle socket disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});




app.use(express.json({ limit: "16kb" })) // cann remove limit. set this only when limiting json.
app.use(express.urlencoded({ extended: true, limit: "16kb" })) // allows to receive data from url by encoding special characters.
app.use(express.static("public")) // allows to store static data received from frontend into public.

app.use(cookieParser()) // allows to access cookies of browser as well set the cookies.

// routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/ambulance", ambulanceRouter)

app.use((err, req, res, next) => {
    console.log("error: ", err)
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    } else if (err.code === 11000) {
        console.log("error: dup", err.errorResponse.code)
        const dupKey = err.errorResponse.keyPattern

        res.status(400).json({
            success: "False",
            message: "Duplicate key error",
            errors: dupKey
        });

    } else {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            errors: [err.message],
            data: null,
        });
    }
});

export { app }
export { server }
