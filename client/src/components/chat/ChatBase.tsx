"use client";

import { use, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatNav from "@/components/chat/ChatNav";
import ChatUserDialog from "@/components/chat/ChatUserDialog";
import Chats from "@/components/chat/Chats";
import { getSocket } from "@/lib/socket.config";
import { useQueryClient } from "@tanstack/react-query";
import { ChatGroupType, GroupChatUserType, MessageType } from "@/types";

export default function ChatBase({
  group,
  users,
  oldMessages,
}: {
  group: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();

  const queryClient = useQueryClient();

  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
    };
    return socket.connect();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem(group.id);

    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
      setOpen(false); // If we have user data, don't show the dialog
    }
  }, [group.id, users]);

  useEffect(() => {
    socket.on("user_joined", (newUser: GroupChatUserType) => {
      console.log("The user joined is", newUser);
      // Add a small delay before refreshing queries
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["chatUsers", group.id] });
        queryClient.invalidateQueries({ queryKey: ["chats", group.id] });
      }, 300);
    });

    return () => {
      socket.off("user_joined");
    };
  }, [socket]);

  return (
    <div className={"flex"}>
      <ChatSidebar users={users} />
      <div className={"w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white"}>
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} />
        )}

        <Chats
          group={group}
          oldMessages={oldMessages}
          chatUser={chatUser}
          key={JSON.stringify(oldMessages)}
        />
      </div>
    </div>
  );
}
