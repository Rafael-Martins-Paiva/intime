import { MessageRepository } from "../../domain/repositories/MessageRepository";
import { Message } from "../../domain/entities/Message";

export class SendMessageUseCase {
  constructor(private readonly repo: MessageRepository) {}
  
  async execute(input: { userId: string;content: string }) {
    const message = Message.create(input.userId, input.content);
    
    await this.repo.save(message);
    
    return message;
  }
}