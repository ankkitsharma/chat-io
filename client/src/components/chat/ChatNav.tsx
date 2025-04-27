import React from "react";
import MobileChatSidebar from "./MobileChatSidebar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";
import { GroupChatUserType, ChatGroupType } from "../../../types";

export default function ChatNav({
  chatGroup,
  users,
  user,
}: {
  chatGroup: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  user?: GroupChatUserType;
}) {
  const router = useRouter();
  return (
    <nav className="w-full flex justify-between items-center  px-6 py-2 border-b">
      <div className="flex space-x-4 md:space-x-0 items-center">
        <div className="md:hidden">
          <MobileChatSidebar users={users} />
        </div>
        <Button variant={"ghost"} onClick={() => router.push("/dashboard")}>
          <CircleArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 text-transparent bg-clip-text">
          {chatGroup.title}
        </h1>
        {/* <p>{new Date(chatGroup.created_at).toDateString()}</p> */}
      </div>
      <p>{user?.name}</p>
    </nav>
  );
}
