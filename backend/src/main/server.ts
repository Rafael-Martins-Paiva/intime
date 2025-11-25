import { WebSocketGateway } from "../infra/ws/WebSocketServer";
import { RedisMessageRepository } from "../infra/repositories/RedisMessageRepository";
import { SendMessageUseCase } from "../application/usecases/SendMessageUseCase";
import { ListMessagesUseCase } from "../application/usecases/ListMessagesUseCase";
import { RedisPubSub } from "../infra/redis/RedisPubSub";

async function bootstrap() {
  const repo = new RedisMessageRepository();
  const redisPubSub = new RedisPubSub();
  await redisPubSub.connect();
  
  const sendMessage = new SendMessageUseCase(repo);
  const listMessages = new ListMessagesUseCase(repo);
  
  const ws = new WebSocketGateway(8080);
  
  redisPubSub.subscribe("new_message", msg => {
    ws.broadcast("new_message", msg);
  });
  
  ws.onConnection(socket => {
    socket.on("message", async raw => {
      const data = JSON.parse(raw.toString());
      const message = await sendMessage.execute(data);
      await redisPubSub.publish("new_message", message);
    });
    
    listMessages.execute().then(messages =>
      socket.send(JSON.stringify({ event: "history", data: messages }))
    );
  });
  
  console.log("Chat rodando em ws://localhost:8080");
}

bootstrap();