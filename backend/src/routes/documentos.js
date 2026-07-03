const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const colaboradores = require("../data/colaboradores");

// GET /api/documentos/:cpf?tipo=IR|BOLETO&matricula=12345
router.get("/documentos/:cpf", (req, res) => {
  const { cpf } = req.params;
  const { tipo, matricula, ano } = req.query;

  // Normalizar CPF (remover pontuação)
  const cpfNormalizado = cpf.replace(/\D/g, "");

  if (!/^\d{11}$/.test(cpfNormalizado)) {
    return res.status(400).json({
      success: false,
      message: "CPF inválido. Informe um CPF com 11 dígitos.",
    });
  }

  if (matricula) {
    const colaborador = colaboradores.find((c) => {
      const cpfColaborador = c.cpf.replace(/\D/g, "");
      return c.matricula === matricula && cpfColaborador === cpfNormalizado;
    });

    if (!colaborador) {
      return res.status(404).json({
        success: false,
        message: "Matrícula não localizada para o CPF informado.",
      });
    }
  }

  // Validar tipo de documento se fornecido
  if (tipo && !["IR", "BOLETO"].includes(tipo.toUpperCase())) {
    return res.status(400).json({
      success: false,
      message: "Tipo de documento inválido. Use 'IR' ou 'BOLETO'.",
    });
  }

  if (ano && !/^\d{4}$/.test(ano)) {
    return res.status(400).json({
      success: false,
      message: "Ano inválido. Informe um ano com 4 dígitos.",
    });
  }

  const anoFiltro = ano?.trim();
  const documentos = [];

  // Simular token de expiração
  const tokenExpiration =
    Math.floor(Date.now() / 1000) +
    (parseInt(process.env.TOKEN_EXPIRATION_SECONDS) || 3600);
  const token = uuidv4();

  // Documentos IR (Informes de Rendimentos)
  if (!tipo || tipo.toUpperCase() === "IR") {
    const anosIR = ["2024", "2025"];
    const anosDisponiveis = anoFiltro
      ? anosIR.filter((anoDisponivel) => anoDisponivel === anoFiltro)
      : anosIR;

    anosDisponiveis.forEach((anoDisponivel) => {
      const fileName = `INF_${anoDisponivel}_${cpfNormalizado}.pdf`;
      const filePath = path.join(
        __dirname,
        `../../../backend/storage/IR/${anoDisponivel}/${fileName}`,
      );

      // Verificar se o arquivo existe (ou simular existência)
      documentos.push({
        nome: `Informe de Rendimentos ${anoDisponivel}`,
        tipo: "IR",
        ano: anoDisponivel,
        link: `http://localhost:${process.env.PORT || 3001}/storage/IR/${anoDisponivel}/${fileName}?token=${token}&expires=${tokenExpiration}`,
      });
    });
  }

  // Documentos BOLETO
  if (!tipo || tipo.toUpperCase() === "BOLETO") {
    const anoBoleto = anoFiltro || "2025";
    const fileName = `BLT_01_${anoBoleto}_${cpfNormalizado}.pdf`;

    documentos.push({
      nome: `Boleto 01/${anoBoleto}`,
      tipo: "BOLETO",
      ano: anoBoleto,
      mes: "01",
      link: `http://localhost:${process.env.PORT || 3001}/storage/BOLETOS/${anoBoleto}/01/${fileName}?token=${token}&expires=${tokenExpiration}`,
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
