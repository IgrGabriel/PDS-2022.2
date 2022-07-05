const Transacao = require("../model/app.model.transacao.js");
const authMiddleware = require("../middlewares/app.middleware.auth.js");

// Calcular o valor total das despesas
exports.calcValueExpense = async (req, res) => {
  const user = req.params.userId;

  try {
    const transaction = await Transacao.find({ tipo: "despesa" });

    const valorDespesas = transaction.reduce((total, transacao) => {
      if (transacao.user == user) {
        return total + parseFloat(transacao.valor);
      } else {
        return total;
      }
    }, 0);

    return res.status(200).send({
      mensagem: "Valor total das despesas: " + valorDespesas,
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Usuario nao encontrado" + req.params.userId,
      });
    }
    return res.status(400).send({
      message:
        "Ocorreu algum erro ao calcular receita usando o id " +
        req.params.userId,
    });
  }
};

// Calcular o valor total das despesas
exports.calcValueRevenue = async (req, res) => {
  const user = req.params.userId;
  try {
    const transaction = await Transacao.find({ tipo: "receita" });

    const valorReceitas = transaction.reduce((total, transacao) => {
      if (transacao.user == user) {
        return total + parseFloat(transacao.valor);
      } else {
        return total;
      }
    }, 0);

    return res.status(200).send({
      mensagem: "Valor total das receitas: " + valorReceitas,
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Usuario nao encontrado" + req.params.userId,
      });
    }
    return res.status(400).send({
      message:
        "Ocorreu algum erro ao calcular despesa usando o id " +
        req.params.userId,
    });
  }
};
