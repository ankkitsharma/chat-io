import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;
import Routes from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { setupSocket } from "./socket.js";
// import { createAdapter } from "@socket.io/redis-streams-adapter";
// import redis from "./config/redis.config.js";
import { instrument } from "@socket.io/admin-ui";
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://chat-io-cl.vercel.app", "http://localhost:3000"],
        credentials: true,
    },
    // adapter: createAdapter(redis),
});
instrument(io, {
    auth: false,
    mode: "development",
});
setupSocket(io);
// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (_req, res) => {
    res.send("It's working 🙌");
});
// Routes
app.use("/api", Routes);
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
export { io };
export default app;
//# sourceMappingURL=index.js.map