import { NextFunction, Request, Response } from "express";
import prisma from "../config/db.config.js";

interface GroupUserType {
  name: string;
  group_id: string;
}

const ChatGroupUserController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { group_id } = req.query;
      const users = await prisma.groupUsers.findMany({
        where: {
          group_id: group_id as string,
        },
      });
      if (!users) {
        res.status(404).json({ message: "No user found", data: [] });
      } else {
        res
          .status(200)
          .json({ message: "Data fetched successfully", data: users });
      }
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. please try again!" });
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: GroupUserType = req.body;
      const user = await prisma.groupUsers.create({
        data: body,
      });
      res.status(201).json({ message: "User added successfully!", data: user });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. please try again!" });
      next(error);
    }
  },
};

export default ChatGroupUserController;
