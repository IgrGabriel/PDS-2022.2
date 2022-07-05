module.exports = (app) => {
  const Transacao = require("../controllers/app.controller.transacao.js");
  const authMiddleware = require("../middlewares/app.middleware.auth.js");

  app.use(authMiddleware);

  app.post("/transacao", Transacao.create);

  app.get("/transacao", Transacao.findAll);

  app.get("/transacao/:transactionId", Transacao.findOne);

  app.put("/transacao/:transactionId", Transacao.update);

  app.delete("/transacao/:transactionId", Transacao.delete);

  app.get("/transacaoList", Transacao.populateList);
};
