import { Server, Socket } from "socket.io";
import prisma from "./config/db.config.js";

interface CustomSocket extends Socket {
  room?: string;
}

function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid room please pass correct room id"));
    }
    socket.room = room;
    next();
  });
  io.on("connection", (socket: CustomSocket) => {
    // Join the room
    socket.join(socket.room!);

    console.log("The socket connected...", socket.id);

    socket.on("message", async (data) => {
      console.log("Server side message", data);
      // socket.broadcast.emit("message", data);
      await prisma.chats.create({
        data: data,
      });
      socket.to(socket.room!).emit("message", data);
    });

    socket.on("user_joined", async (user) => {
      console.log("The user joined", user);
      socket.to(socket.room!).emit("user_joined", user);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected...", socket.id);
    });
  });
}

export { setupSocket };
