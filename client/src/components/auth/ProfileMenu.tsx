"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../common/UserAvatar";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
const LogoutModal = dynamic(() => import("../auth/LogoutModal"));

type props = {
  name: string;
  image?: string;
};

export default function ProfileMenu({ name, image }: props) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  return (
    <>
      {logoutOpen && (
        <Suspense fallback={<p>Loading...</p>}>
          <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} />
        </Suspense>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={name} image={image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
