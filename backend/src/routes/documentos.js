const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

// GET /api/documentos/:cpf?tipo=IR|BOLETO
router.get("/documentos/:cpf", (req, res) => {
  const { cpf } = req.params;
  const { tipo } = req.query;

  // Normalizar CPF (remover pontuação)
  const cpfNormalizado = cpf.replace(/\D/g, "");

  // Validar tipo de documento se fornecido
  if (tipo && !["IR", "BOLETO"].includes(tipo.toUpperCase())) {
    return res.status(400).json({
      success: false,
      message: "Tipo de documento inválido. Use 'IR' ou 'BOLETO'.",
    });
  }

  const documentos = [];

  // Simular token de expiração
  const tokenExpiration =
    Math.floor(Date.now() / 1000) +
    (parseInt(process.env.TOKEN_EXPIRATION_SECONDS) || 3600);
  const token = uuidv4();

  // Documentos IR (Informes de Rendimentos)
  if (!tipo || tipo.toUpperCase() === "IR") {
    const anosIR = ["2024", "2025"];

    anosIR.forEach((ano) => {
      const fileName = `INF_${ano}_${cpfNormalizado}.pdf`;
      const filePath = path.join(
        __dirname,
        `../../../backend/storage/IR/${ano}/${fileName}`,
      );

      // Verificar se o arquivo existe (ou simular existência)
      documentos.push({
        nome: `Informe de Rendimentos ${ano}`,
        tipo: "IR",
        ano: ano,
        link: `http://localhost:${process.env.PORT || 3001}/storage/IR/${ano}/${fileName}?token=${token}&expires=${tokenExpiration}`,
      });
    });
  }

  // Documentos BOLETO
  if (!tipo || tipo.toUpperCase() === "BOLETO") {
    const fileName = `BLT_01_2025_${cpfNormalizado}.pdf`;

    documentos.push({
      nome: "Boleto 01/2025",
      tipo: "BOLETO",
      ano: "2025",
      mes: "01",
      link: `http://localhost:${process.env.PORT || 3001}/storage/BOLETOS/2025/01/${fileName}?token=${token}&expires=${tokenExpiration}`,
    });
  }

  if (documentos.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Documento não localizado.",
    });
  }

  res.status(200).json({
    success: true,
    documentos: documentos,
  });
});

module.exports = router;
