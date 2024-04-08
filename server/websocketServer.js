const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 });

let users = [];

function updateUserList() {
  const userListMessage = JSON.stringify({
    type: "userList",
    users: users.map((user) => user.name),
  });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(userListMessage);
    }
  });
}

wss.on("connection", function connection(ws) {
  console.log("A new client connected!");

  const user = { name: "Anonymous" + Math.floor(Math.random() * 1000), ws: ws };
  users.push(user);
  updateUserList();

  ws.on("message", function incoming(data) {
    const message = JSON.parse(data);

    if (message.type === "setName") {
      user.name = message.username;
      updateUserList();
    } else {
      console.log(`Broadcasting message to client: ${data}`);
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    }
  });

  ws.on("close", () => {
    users = users.filter((u) => u.ws !== ws);
    updateUserList();
    console.log("A client disconnected");
  });
});
