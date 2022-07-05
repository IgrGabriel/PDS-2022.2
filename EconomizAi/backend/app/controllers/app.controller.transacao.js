const Transacao = require("../model/app.model.transacao.js");
const authMiddleware = require("../middlewares/app.middleware.auth.js");

//Criando e salvando um nova transacao
exports.create = (req, res) => {
  const transaction = new Transacao({
    id: req.params._id,
    data: req.body.data,
    categoria: req.body.categoria,
    valor: req.body.valor,
    descricao: req.body.descricao,
    tipo: req.body.tipo,
    user: req.userId,
  });
  transaction
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao adicionar a transação",
      });
    });
};

// Buscando todas as transacoes do banco de dados
exports.findAll = (req, res) => {
  Transacao.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao buscar as transações",
      });
    });
};

exports.populateList = async (req, res) => {
  try {
    const transacao = await Transacao.find().populate("user");

    return res.send({ transacao });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar transação" });
  }
};

// Buscando uma unica mensagem com uma transactionId
exports.findOne = (req, res) => {
  Transacao.findById(req.params.transactionId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message:
            "Mensagem não encontrada com o id " + req.params.transactionId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Transacao não foi encontrada pelo id " + req.params.transactionId,
        });
      }
      return res.status(500).send({
        message:
          "Erro ao buscar transação pelo o id " + req.params.transactionId,
      });
    });
};

// Atualizando uma transação identificada por transactionId em uma requisição
exports.update = (req, res) => {
  Transacao.findByIdAndUpdate(
    req.params.transactionId,
    {
      data: req.body.data,
      categoria: req.body.categoria,
      valor: req.body.valor,
      descricao: req.body.descricao,
      tipo: req.body.tipo,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message:
            "Transação não foi encontrada pelo o id " +
            req.params.transactionId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Transação não foi encontrada pelo o id " +
            req.params.transactionId,
        });
      }
      return res.status(500).send({
        message:
          "Erro ao atualizar transação pelo id " + req.params.transactionId,
      });
    });
};

// Deletando uma mensagem com um messageId especificado na requisição
exports.delete = (req, res) => {
  Transacao.findByIdAndRemove(req.params.transactionId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message:
            "Transação não encontrada pelo o id " + req.params.transactionId,
        });
      }
      res.send({ message: "Transação deletada com sucesso!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message:
            "Transação não encontrada pelo o id " + req.params.transactionId,
        });
      }
      return res.status(500).send({
        message:
          "Não foi possível deletar a transação com o id " +
          req.params.transactionId,
      });
    });
};
