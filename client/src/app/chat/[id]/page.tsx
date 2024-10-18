import ChatBase from "@/components/chat/ChatBase";
import { fetchChatGroup } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";
import { validate as isValidUUID } from "uuid";

export default async function Chat({ params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) {
    return notFound();
  }
  const group: ChatGroupType | null = await fetchChatGroup(params.id);

  if (group === null) {
    return notFound();
  }

  return (
    <div>
      <h1>Hello I am chat</h1>
      <ChatBase groupId={params.id} />
    </div>
  );
}
