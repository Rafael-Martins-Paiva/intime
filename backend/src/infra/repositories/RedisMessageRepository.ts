import { MessageRepository } from "../../domain/repositories/MessageRepository";
import { Message } from "../../domain/entities/Message";
import { createClient } from "redis";

export class RedisMessageRepository implements MessageRepository {
  private db = createClient();
  
  constructor() {
    this.db.connect();
  }
  
  async save(message: Message): Promise < void > {
    await this.db.lPush("messages", JSON.stringify(message));
  }
  
  async list(): Promise < Message[] > {
    const raw = await this.db.lRange("messages", 0, -1);
    return raw.map(item => JSON.parse(item));
  }
}