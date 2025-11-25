const socket = new WebSocket("ws://localhost:8080");

socket.onmessage = evt => {
  const { event, data } = JSON.parse(evt.data);
  
  if (event === "history") data.forEach(addMessage);
  if (event === "new_message") addMessage(data);
};

function addMessage(msg) {
  const div = document.createElement("div");
  div.innerText = `[${msg.userId}] ${msg.content}`;
  document.getElementById("messages").appendChild(div);
}

function send() {
  const content = document.getElementById("text").value;
  socket.send(JSON.stringify({ userId: "user123", content }));
}