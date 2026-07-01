const express = require("express");
const router = express.Router();
const colaboradores = require("../data/colaboradores");

// POST /api/validar-colaborador
router.post("/validar-colaborador", (req, res) => {
  const { matricula, cpf, dataNascimento, dataAdmissao } = req.body;

  // Validar se os campos obrigatórios foram fornecidos
  if (!matricula || !cpf || !dataNascimento || !dataAdmissao) {
    return res.status(400).json({
      success: false,
      message:
        "Campos obrigatórios ausentes: matricula, cpf, dataNascimento, dataAdmissao",
    });
  }

  // Normalizar CPF (remover pontuação)
  const cpfNormalizado = cpf.replace(/\D/g, "");

  // Buscar colaborador nos dados mockados
  const colaborador = colaboradores.find((c) => {
    const cpfColaborador = c.cpf.replace(/\D/g, "");
    return (
      c.matricula === matricula &&
      cpfColaborador === cpfNormalizado &&
      c.dataNascimento === dataNascimento &&
      c.dataAdmissao === dataAdmissao
    );
  });

  if (!colaborador) {
    return res.status(404).json({
      success: false,
      message: "Pessoa não localizada.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Colaborador validado com sucesso.",
    colaborador: {
      nome: colaborador.nome,
      cpf: colaborador.cpf,
    },
  });
});

module.exports = router;
