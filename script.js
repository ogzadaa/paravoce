document.getElementById("messageForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("messageInput");

  // Armazenar mensagem no localStorage
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push({ text: messageInput.value });
  localStorage.setItem("messages", JSON.stringify(messages));

  messageInput.value = "";
  loadMessages();
});

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
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
