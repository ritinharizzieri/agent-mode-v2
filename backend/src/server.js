require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const validacaoRoutes = require("./routes/validacao");
const documentosRoutes = require("./routes/documentos");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../")));

// Rotas API
app.use("/api", validacaoRoutes);
app.use("/api", documentosRoutes);

// Rota de health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Servidor funcionando normalmente.",
    timestamp: new Date().toISOString(),
  });
});

// Tratamento de erro para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada.",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado em http://localhost:${PORT}`);
  console.log(`📍 Endpoints disponíveis:`);
  console.log(`   - POST http://localhost:${PORT}/api/validar-colaborador`);
  console.log(
    `   - GET  http://localhost:${PORT}/api/documentos/:cpf?tipo=IR|BOLETO`,
  );
  console.log(`   - GET  http://localhost:${PORT}/health`);
});

module.exports = app;
