import express from "express";
import http from "http";
import { Server as IOServer } from "socket.io";
import { router, service as chatService } from "./routes";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new IOServer(server);

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(router);

io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);
  
  chatService.getHistory().then((history) => {
    socket.emit("history", history);
  });
  
  socket.on("message:send", async (payload: { user: string;text: string }) => {
    try {
      const message = await chatService.postMessage(payload.user, payload.text);
      io.emit("message:new", message);
    } catch (err) {
      socket.emit("error", { message: (err as Error).message });
    }
  });
  
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});