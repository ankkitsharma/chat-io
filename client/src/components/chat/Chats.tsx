import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { ChatGroupType, MessageType, GroupChatUserType } from "@/types";
export default function Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: ChatGroupType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // This effect syncs the local messages state with the oldMessages prop
  useEffect(() => {
    setMessages(oldMessages);
    scrollToBottom();
  }, [oldMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
    };

    // Log socket id to verify it's consistent
    console.log("Socket ID in Chats.tsx:", socket.id);
    return socket.connect();
  }, [group.id]);

  useEffect(() => {
    // Listen for incoming messages
    // Add debugging for socket connection status
    console.log("Socket connected status in chats:", socket.connected);
    socket.on("message", (data: MessageType) => {
      console.log("The message is", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    // For debugging, verify handlers are registered
    console.log("Message handler registered");

    // Cleanup all listeners when component unmounts or dependencies change
    return () => {
      console.log("Cleaning up message listener");
      socket.off("message");
      socket.off("connect");
    };
  }, [socket]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };
    console.log("The payload is", payload);
    socket.emit("message", payload);
    setMessage("");
    setMessages([...messages, payload]);
  };

  return (
    <div className="flex flex-col h-[94vh]  p-4">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-sm rounded-lg p-2 ${
                message.isSystemMessage
                  ? "bg-gray-100 text-gray-600 italic self-center text-sm"
                  : message.name === chatUser?.name
                    ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white self-end"
                    : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
              }`}
            >
              {!message.isSystemMessage && <div>{message.name}</div>}
              {message.message}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}
