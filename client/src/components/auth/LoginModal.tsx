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

export default function LoginModal() {
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
      </DialogContent>
    </Dialog>
  );
}
