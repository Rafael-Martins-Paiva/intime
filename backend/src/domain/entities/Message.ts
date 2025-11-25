export class Message {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly content: string,
    public readonly timestamp: Date = new Date()
  ) {}
  
  static create(userId: string, content: string): Message {
    return new Message(
      crypto.randomUUID(),
      userId,
      content,
      new Date()
    );
  }
}