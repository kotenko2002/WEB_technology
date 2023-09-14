if ("WebSocket" in window) {
  const sendBtn = document.querySelector("#send");
  const messages = document.querySelector("#messages");
  const messageBox = document.querySelector("#messageBox");

  function showMessage(message) {
    messages.textContent += `\n${message}`;
    messages.scrollTop = messages.scrollHeight;
    messageBox.value = "";
  }

  let ws = new WebSocket("ws://localhost:8082");

  ws.onopen = function () {
    console.log("Connected to Server");
  };

  sendBtn.onclick = function () {
    if (ws) {
      ws.send(messageBox.value);
      showMessage(`ME: ${messageBox.value}`);
    } else {
      alert("ERROR: Not connected... refresh to try again!");
    }
  };

  ws.onmessage = function ({ data }) {
    showMessage(data);
  };

  ws.onclose = function () {
    ws = null;
    alert("Connection closed... refresh to try again!");
  };
} else {
  alert("WebSocket NOT supported by your Browser!");
}
