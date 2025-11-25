import { WebSocketServer as WSS } from "ws";

export class WebSocketGateway {
  private wss: WSS;
  
  constructor(port: number) {
    this.wss = new WSS({ port });
  }
  
  broadcast(event: string, data: any) {
    const payload = JSON.stringify({ event, data });
    this.wss.clients.forEach(client => client.send(payload));
  }
  
  onConnection(callback: (socket: any) => void) {
    this.wss.on("connection", callback);
  }
}