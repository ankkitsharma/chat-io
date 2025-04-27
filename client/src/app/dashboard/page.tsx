import DashNav from "@/components/dashboard/DashNav";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateChat from "@/components/chatGroup/CreateChat";
import { fetchChatGroups } from "@/fetch/groupFetch";
import GroupChatCard from "@/components/chatGroup/GroupChatCard";
import { ChatGroupType } from "../../../types";

export default async function page() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const groups: Array<ChatGroupType> | [] = await fetchChatGroups(
    session?.user?.token!
  );
  return (
    <div>
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />
      <div className="container">
        <div className="flex justify-end mt-10">
          <CreateChat user={session?.user!} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.length > 0 &&
          groups.map((item, index) => (
            <GroupChatCard group={item} key={index} user={session?.user!} />
          ))}
      </div>
    </div>
  );
}
