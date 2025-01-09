const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Conexão com o MongoDB
mongoose
  .connect(
    `mongodb+srv://ogzada:${process.env.DB_PASSWORD}@cluster0.fhrhs.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Modelo de Mensagem
const mensagemSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  data: { type: Date, default: Date.now },
});

const Mensagem = mongoose.model("Mensagem", mensagemSchema);

// Rotas
app.post("/mensagens", async (req, res) => {
  const novaMensagem = new Mensagem(req.body);
  try {
    await novaMensagem.save();
    res.status(201).send(novaMensagem);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/mensagens", async (req, res) => {
  try {
    const mensagens = await Mensagem.find();
    res.status(200).send(mensagens);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para excluir uma mensagem
app.delete("/mensagens/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Mensagem.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint de verificação de saúde
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Rota para servir o arquivo index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
