import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";

export class ChatController {
  constructor(private chatService: ChatService) {}
  
  async getHistory(req: Request, res: Response) {
    const history = await this.chatService.getHistory();
    res.json(history);
  }
  
  async postMessage(req: Request, res: Response) {
    const { user, text } = req.body;
    try {
      const message = await this.chatService.postMessage(user, text);
      res.status(201).json(message);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
  
  async clear(req: Request, res: Response) {
    await this.chatService.clearHistory();
    res.status(204).send();
  }
}