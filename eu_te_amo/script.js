document
  .getElementById("messageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const messageInput = document.getElementById("message");
    const messageText = messageInput.value;

    const messagesDiv = document.getElementById("messages");
    const newMessage = document.createElement("p");
    newMessage.textContent = messageText;
    messagesDiv.appendChild(newMessage);

    messageInput.value = "";
  });
