import { NextFunction, Request, Response } from "express";
import prisma from "../config/db.config.js";

const ChatGroupController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user!;
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      res.status(200).json({
        message: "Chat Groups fetched successfully",
        data: groups,
      });
      return;
    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const groups = await prisma.chatGroup.findUnique({
        where: {
          id: id,
        },
      });
      if (groups) {
        res.status(200).json({
          message: "Chat Group fetched successfully",
          data: groups,
        });
      } else {
        res.status(404).json({
          message: "No group found",
        });
      }
      return;
    } catch (error) {
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const user = req.user!;
      await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user.id,
        },
      });
      res.status(201).json({ message: "Chat Group created successfully!" });
      return;
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const { id } = req.params;
      await prisma.chatGroup.update({
        data: {
          title: body.title,
          passcode: body.passcode,
        },
        where: {
          id: id,
        },
      });
      res.status(201).json({ message: "Chat Group updated successfully!" });
      return;
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });
      res.status(201).json({
        message: "Chat Group deleted successfully",
      });
      return;
    } catch (error) {
      next(error);
    }
  },
};

export default ChatGroupController;
