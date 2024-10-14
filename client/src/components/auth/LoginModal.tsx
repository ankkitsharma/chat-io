"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  function handlLogin() {
    signIn("google", {
      callbackUrl: "/dashboard",
      redirect: true,
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Getting Started</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Chai IO</DialogTitle>
          <DialogDescription>
            Chat IO makes it effortless to create secure chat links and start
            conversations in second.s
          </DialogDescription>
        </DialogHeader>
        <Button variant={"outline"} onClick={handlLogin}>
          <Image
            src={"/images/google.png"}
            className="mr-4"
            width={25}
            height={25}
            alt="google-logo"
          />
          Continue with google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
