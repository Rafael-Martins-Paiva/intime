import { createClient } from "redis";

export class RedisPubSub {
  private publisher = createClient();
  private subscriber = createClient();
  
  async connect() {
    await this.publisher.connect();
    await this.subscriber.connect();
  }
  
  publish(channel: string, message: any) {
    return this.publisher.publish(channel, JSON.stringify(message));
  }
  
  subscribe(channel: string, callback: (data: any) => void) {
    this.subscriber.subscribe(channel, (msg) => {
      callback(JSON.parse(msg));
    });
  }
}