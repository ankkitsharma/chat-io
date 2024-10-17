import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type props = {
  name: string;
  image?: string;
};

export default function UserAvatar({ name, image }: props) {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}
