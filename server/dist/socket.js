import prisma from "./config/db.config.js";
function setupSocket(io) {
    io.use((socket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
            return next(new Error("Invalid room please pass correct room id"));
        }
        socket.room = room;
        next();
    });
    io.on("connection", (socket) => {
        // Join the room
        socket.join(socket.room);
        console.log("The socket connected...", socket.id);
        socket.on("message", async (data) => {
            console.log("Server side message", data);
            // socket.broadcast.emit("message", data);
            await prisma.chats.create({
                data: data,
            });
            socket.to(socket.room).emit("message", data);
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected...", socket.id);
        });
    });
}
export { setupSocket };
//# sourceMappingURL=socket.js.map