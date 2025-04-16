const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8000 });

let count = 0;

// Funkcja broadcastująca wiadomość do wszystkich klientów
function broadcastCount() {
  const message = count.toString();
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    if (message === "click") {
      count++;
      broadcastCount(); // rozsyłamy aktualny count wszystkim
    } else if (message === "load") {
      ws.send(count.toString()); // wysyłamy tylko temu klientowi
    }
  });
});
