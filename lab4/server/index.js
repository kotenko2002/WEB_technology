const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

wss.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};

const usedNames = new Set();

wss.on("connection", (ws) => {
  ws.id = wss.getUniqueID();
  console.log(`New client connected with id: ${ws.id}`);

  let clientName;
  do {
    clientName = `User_${Math.floor(Math.random() * 1000)}`;
  } while (usedNames.has(clientName));

  usedNames.add(clientName);

  ws.name = clientName;
  console.log(`Assigned name "${clientName}" to client ${ws.id}`);

  ws.onmessage = ({ data }) => {
    console.log(`Client ${ws.name} (${ws.id}): ${data}`);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`${ws.name}: ${data}`);
      }
    });
  };

  ws.onclose = function () {
    console.log(`Client ${ws.name} (${ws.id}) has disconnected!`);
    usedNames.delete(clientName);
  };
});
