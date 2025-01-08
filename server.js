const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Middleware
app.use(bodyParser.json());
app.use(express.static("meu sit")); // Serve arquivos estáticos da pasta "meu sit"

// Rota para obter mensagens
app.get("/messages", (req, res) => {
  fs.readFile(__dirname + "/messages.json", (err, data) => {
    if (err) {
      console.error("Erro ao ler mensagens:", err); // Log do erro no console
      return res.status(500).send("Erro ao ler mensagens.");
    }
    res.json(JSON.parse(data));
  });
});

// Rota para publicar uma nova mensagem
app.post("/messages", (req, res) => {
  const newMessage = req.body.message;
  fs.readFile(__dirname + "/messages.json", (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao ler mensagens.");
    }
    const messages = JSON.parse(data);
    messages.messages.push(newMessage);
    fs.writeFile(
      __dirname + "/messages.json",
      JSON.stringify(messages),
      (err) => {
        if (err) {
          return res.status(500).send("Erro ao salvar a mensagem.");
        }
        res.status(201).send("Mensagem publicada com sucesso!");
      }
    );
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
