module.exports = (app) => {
  const Transacao = require("../controllers/app.controller.transacao.js");
  const authMiddleware = require("../middlewares/app.middleware.auth.js");

  app.use(authMiddleware);

  app.post("/transacao", Transacao.create);

  app.get("/transacao", Transacao.findAll);

  app.get("/transacao/:transactionId", Transacao.findOne);

  app.put("/transacao/:transactionId", Transacao.update);

  app.delete("/transacao/:transactionId", Transacao.delete);

  app.get("/transacao/listar/user/todos", Transacao.populateList);

  app.get("/transacao/listar/user/:userId", Transacao.listTransactiosUser);

  const Main = require("../main/app.main.js");

  app.get("/transacao/calcular/despesas/:userId", Main.calcValueExpense);

  app.get("/transacao/calcular/receitas/:userId", Main.calcValueRevenue);
};
