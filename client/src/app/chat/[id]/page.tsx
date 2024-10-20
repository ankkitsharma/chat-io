import ChatBase from "@/components/chat/ChatBase";
import { fetchChatGroup, fetchChatUsers } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";
import { validate as isValidUUID } from "uuid";
import { fetchChats } from "@/fetch/chatsFetch";

export default async function Chat({ params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) {
    return notFound();
  }
  const group: ChatGroupType | null = await fetchChatGroup(params.id);

  if (group === null) {
    return notFound();
  }

  const users: Array<GroupChatUserType> | [] = await fetchChatUsers(params.id);
  const chats: Array<MessageType> | [] = await fetchChats(params.id);
  return (
    <div>
      <ChatBase users={users} group={group} oldMessages={chats} />
    </div>
  );
}
