import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { GameManager } from "./GameManager";
import { User } from "./SocketManager";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + " Received request for " + request.url);
  response.end("hi there");
});

const wss = new WebSocketServer({ server });
const gameManager = new GameManager();

wss.on("connection", function connection(ws: WebSocket) {
  ws.on("error", console.error);

  //   ws.on("message", function message(data, isBinary) {
  //     wss.clients.forEach(function each(client) {
  //       if (client.readyState === WebSocket.OPEN) {
  //         client.send(data, { binary: isBinary });
  //       }
  //     });
  //   });

  gameManager.addUser(new User(ws));
});

server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
