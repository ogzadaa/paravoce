document.addEventListener("DOMContentLoaded", () => {
  const messageForm = document.getElementById("messageForm");
  const messagesContainer = document.getElementById("messagesContainer");

  // Função para carregar mensagens
  const loadMessages = async () => {
    const response = await fetch("/messages");
    const data = await response.json();
    messagesContainer.innerHTML = "";
    data.messages.forEach((message) => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.textContent = message;
      messagesContainer.appendChild(messageDiv);
    });
  };

  // Carregar mensagens ao iniciar
  loadMessages();

  // Manipular envio do formulário
  messageForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;

    await fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    messageInput.value = "";
    loadMessages();
  });
});
