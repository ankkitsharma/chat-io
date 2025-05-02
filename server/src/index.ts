import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT;
import Routes from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";
// import { instrument } from "@socket.io/admin-ui";

const server = createServer(app);
interface SocketOptions {
  cors: {
    origin: string[];
    credentials: boolean;
  };
  adapter?: ReturnType<typeof createAdapter>;
}
const socketOptions: SocketOptions = {
  cors: {
    origin: [
      "http://digi.ankitsh.cc:3000",
      "http://localhost:3000",
      "https://chat.ankitsh.cc",
    ],
    credentials: true,
  },
};

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

// redis.on("error", (err) => {
//   console.error("Redis connection error:", err);
// });

// Try to use Redis adapter if Redis is available
try {
  socketOptions.adapter = createAdapter(redis);
  console.log("Using Redis adapter for Socket.IO");
} catch (error) {
  console.error(
    "Failed to create Redis adapter, falling back to in-memory adapter:",
    error
  );
}
const io = new Server(server, socketOptions);

// instrument(io, {
//   auth: false,
//   mode: "development",
// });

setupSocket(io);

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("It's working 🙌");
});

// Routes
app.use("/apiv1", Routes);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

export { io };
export default app;
