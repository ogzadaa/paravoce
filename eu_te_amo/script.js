document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("messageInput");

  const response = await fetch("/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: messageInput.value }),
  });

  if (response.ok) {
    messageInput.value = "";
    loadMessages();
  }
});

async function loadMessages() {
  const response = await fetch("/messages");
  const messages = await response.json();
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";

  messages.forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = message.text;
    messagesContainer.appendChild(messageElement);
  });
}

// Carregar mensagens ao iniciar
loadMessages();
