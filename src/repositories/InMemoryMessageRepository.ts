import { IMessageRepository } from "./IMessageRepository";
import { Message } from "../models/Message";

export class InMemoryMessageRepository implements IMessageRepository {
  private messages: Message[] = [];
  
  async save(message: Message): Promise < void > {
    this.messages.push(message);
  }
  
  async listAll(): Promise < Message[] > {
    return [...this.messages];
  }
  
  async clear(): Promise < void > {
    this.messages = [];
  }
}