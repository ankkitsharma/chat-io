import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import ChatGroupController from "../controller/ChatGroupController.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
const router = Router();

// Auth Routes
router.post("/auth/login", AuthController.login);

// Chat Group routes
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

export default router;
