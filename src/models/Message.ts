export class Message {
  constructor(
    public id: string,
    public user: string,
    public text: string,
    public createdAt: Date = new Date()
  ) {}
}