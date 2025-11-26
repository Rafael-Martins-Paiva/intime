import { IMessageRepository } from "../repositories/IMessageRepository";
import { Message } from "../models/Message";
import { v4 as uuidv4 } from "uuid";

export class ChatService {
  constructor(private repository: IMessageRepository) {}
  
  async postMessage(user: string, text: string): Promise < Message > {
    if (!user || !text) {
      throw new Error("Usuário e texto são obrigatórios.");
    }
    const message = new Message(uuidv4(), user, text, new Date());
    await this.repository.save(message);
    return message;
  }
  
  async getHistory(): Promise < Message[] > {
    return this.repository.listAll();
  }
  
  async clearHistory(): Promise < void > {
    await this.repository.clear();
  }
}