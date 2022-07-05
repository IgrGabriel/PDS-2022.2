const Transacao = require("../model/app.model.transacao.js");
const authMiddleware = require("../middlewares/app.middleware.auth.js");

// Calcular o valor total das despesas
exports.calcValueExpense = async (req, res) => {
  const user = req.params.userId;
  const transaction = await Transacao.find({ tipo: "despesa" });

  const valorDespesas = transaction.reduce((total, transacao) => {
    if (transacao.user == user) {
      return total + parseFloat(transacao.valor);
    } else {
      return total;
    }
  }, 0);

  res.send({
    mensagem: "Valor total das despesas: " + valorDespesas,
  });
};

// Calcular o valor total das despesas
exports.calcValueRevenue = async (req, res) => {
  const user = req.params.userId;
  const transaction = await Transacao.find({ tipo: "receita" });

  const valorReceitas = transaction.reduce((total, transacao) => {
    if (transacao.user == user) {
      return total + parseFloat(transacao.valor);
    } else {
      return total;
    }
  }, 0);

  res.send({
    mensagem: "Valor total das receitas: " + valorReceitas,
  });
};
