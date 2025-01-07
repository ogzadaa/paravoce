document
  .getElementById("message-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const messageInput = document.getElementById("message-input");
    const messageText = messageInput.value;

    if (messageText) {
      const messagesDisplay = document.getElementById("messages-display");
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.textContent = messageText;
      messagesDisplay.appendChild(messageDiv);

      messageInput.value = ""; // Clear the input after submission
    }
  });
