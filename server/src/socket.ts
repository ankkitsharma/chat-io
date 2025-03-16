import { Server, Socket } from "socket.io";
import prisma from "./config/db.config.js";
import { randomUUID } from "node:crypto";

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
      const queryData = {
        id: randomUUID(),
        name: "System",
        group_id: user.group_id,
        created_at: new Date().toISOString(),
        message: `${user.name} has joined the chat`,
        isSystemMessage: true,
      };
      // console.log("Query data", queryData);
      await prisma.chats.create({
        data: queryData,
      });

      console.log("Query data", queryData);
      socket.to(socket.room!).emit("user_joined", user);
      io.to(socket.room!).emit("message", queryData);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected...", socket.id);
    });
  });
}

export { setupSocket };
