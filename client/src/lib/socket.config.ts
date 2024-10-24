import { io, Socket } from "socket.io-client";
import Env from "./env";

let socket: Socket;

function getSocket(): Socket {
  if (!socket) {
    socket = io(Env.BACKEND_URL, { autoConnect: false, withCredentials: true });
  }
  return socket;
}

export { getSocket };
