"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USERS_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { getSocket } from "@/lib/socket.config";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ChatGroupType } from "@/types";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: ChatGroupType;
}

export default function ChatUserDialog({ open, setOpen, group }: Props) {
  const params = useParams();
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    name: "",
    passcode: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
    };
    return socket.connect();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem(params["id"] as string);
    if (data) {
      const jsonData = JSON.parse(data);
      if (jsonData?.name && jsonData?.group_id) {
        setOpen(false);
      }
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const localData = localStorage.getItem(params["id"] as string);
    if (!localData) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(CHAT_GROUP_USERS_URL, {
          name: state.name,
          group_id: params["id"] as string,
        });
        localStorage.setItem(
          params["id"] as string,
          JSON.stringify(data?.data)
        );

        // onUserJoin(data?.data);
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["chatUsers", group.id] });
          queryClient.invalidateQueries({ queryKey: ["chats", group.id] });
        }, 300);
        socket.emit("user_joined", data?.data);
        toast.success("Joined successfully");
        setOpen(false);
      } catch (error) {
        toast.error("Something went wrong.please try again!");
      } finally {
        setIsLoading(false);
      }
    }
    if (group.passcode != state.passcode) {
      toast.error("Please enter correct passcode!");
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Name and Passcode</DialogTitle>
          <DialogDescription>
            Add your name and passcode to join in room
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <Input
              placeholder="Enter your name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>
          <div className="mt-2">
            <Input
              placeholder="Enter your passcode"
              value={state.passcode}
              onChange={(e) => setState({ ...state, passcode: e.target.value })}
            />
          </div>
          <div className="mt-2">
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
