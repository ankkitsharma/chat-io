"use client";
import { getSocket } from "@/lib/socket.config";
import { useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";

export default function ChatBase({ groupId }: { groupId: string }) {
  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: groupId,
    };
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("message", (data: any) => {
      console.log("The socket message is ", data);
    });
    return () => {
      socket.close();
    };
  }, []);

  function handleClick() {
    socket.emit("message", {
      name: "Ankit",
      id: uuidv4(),
    });
  }

  return (
    <div>
      <Button onClick={handleClick}>Send Message</Button>
    </div>
  );
}
