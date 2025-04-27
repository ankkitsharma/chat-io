"use client";
import ChatBase from "@/components/chat/ChatBase";
import { fetchChatGroup, fetchChatUsers } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";
import { validate as isValidUUID } from "uuid";
import { fetchChats } from "@/fetch/chatsFetch";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react"; // Add this import if you don't have a loader component
import {
  ChatGroupType,
  GroupChatUserType,
  MessageType,
} from "../../../../types";

export default function Chat({ params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) {
    return notFound();
  }

  const { data: group, isLoading: isGroupLoading } =
    useQuery<ChatGroupType | null>({
      queryKey: ["chatGroup", params.id],
      queryFn: () => fetchChatGroup(params.id),
      staleTime: 1000 * 60 * 60, // 1 hour
      enabled: !!params.id, // Only fetch if the ID is valid
    });

  const { data: users, isLoading: isUsersLoading } = useQuery<
    Array<GroupChatUserType>
  >({
    queryKey: ["chatUsers", params.id],
    queryFn: () => fetchChatUsers(params.id),
    enabled: !!group, // Only fetch users if the group is available
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: chats, isLoading: isChatsLoading } = useQuery<
    Array<MessageType>
  >({
    queryKey: ["chats", params.id],
    queryFn: () => fetchChats(params.id),
    enabled: !!group, // Only fetch chats if the group is available
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Show loading state while data is being fetched
  if (isGroupLoading || isUsersLoading || isChatsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (group) {
    return (
      <div>
        <ChatBase users={users || []} group={group} oldMessages={chats || []} />
      </div>
    );
  } else if (!isGroupLoading && group === null) {
    return notFound();
  }
}
