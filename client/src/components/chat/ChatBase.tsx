"use client";
import { getSocket } from "@/lib/socket.config";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatNav from "@/components/chat/ChatNav";
import ChatUserDialog from "@/components/chat/ChatUserDialog";
import Chats from "@/components/chat/Chats";

export default function ChatBase({
  group,
  users,
  oldMessages,
}: {
  group: ChatGroupType;
  users: Array<GroupChatUserType>;
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();

  useEffect(() => {
    const data = localStorage.getItem(group.id);

    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, [group.id]);

  return (
    <div className={"flex"}>
      <ChatSidebar users={users} />
      <div className={"w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white"}>
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} />
        )}

        <Chats group={group} oldMessages={oldMessages} chatUser={chatUser} />
      </div>
    </div>
  );
}
