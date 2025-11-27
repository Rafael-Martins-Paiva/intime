import { Router } from "express";
import path from "path";
import express from "express";
import { ChatController } from "./controllers/ChatController";
import { ChatService } from "./services/ChatService";
import { InMemoryMessageRepository } from "./repositories/InMemoryMessageRepository";

const repository = new InMemoryMessageRepository();
const service = new ChatService(repository);
const controller = new ChatController(service);

const router = Router();

router.get("/api/history", controller.getHistory.bind(controller));
router.post(
  "/api/messages",
  express.json(),
  controller.postMessage.bind(controller)
);
router.delete("/api/history", controller.clear.bind(controller));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

export { router, service };