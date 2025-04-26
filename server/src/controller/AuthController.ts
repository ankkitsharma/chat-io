import { NextFunction, Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";

interface LoginPayloadType {
  name: string;
  email: string;
  provider: string;
  oath_id: string;
  image?: string;
}

const AuthController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: LoginPayloadType = req.body;
      console.log(body);
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }
      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };
      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
        expiresIn: "365d",
      });
      res.json({
        message: "Logged in successfully!",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
      return;
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
