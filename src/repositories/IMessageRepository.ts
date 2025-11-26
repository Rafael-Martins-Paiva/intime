import { Message } from "../models/Message";

export interface IMessageRepository {
  save(message: Message): Promise < void > ;
  listAll(): Promise < Message[] > ;
  clear(): Promise < void > ;
}