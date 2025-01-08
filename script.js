document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("messageInput");

  // Enviar mensagem para o servidor
  const response = await fetch("/mensagens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ texto: messageInput.value }),
  });

  if (response.ok) {
    messageInput.value = "";
    loadMessages();
  } else {
    console.error("Erro ao enviar mensagem:", response.statusText);
  }
});

async function loadMessages() {
  const response = await fetch("/mensagens");
  const messages = await response.json();
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";

  messages.forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = message.texto;
    messagesContainer.appendChild(messageElement);
  });
}

// Carregar mensagens ao iniciar
loadMessages();
