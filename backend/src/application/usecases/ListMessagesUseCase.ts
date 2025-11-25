import { MessageRepository } from "../../domain/repositories/MessageRepository";

export class ListMessagesUseCase {
  constructor(private readonly repo: MessageRepository) {}
  
  async execute() {
    return this.repo.list();
  }
}