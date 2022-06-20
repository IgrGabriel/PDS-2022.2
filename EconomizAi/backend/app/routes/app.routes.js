module.exports = (app) => {
  const App = require("../controllers/app.controller.js");

  app.post("/create", App.create);

  app.get("/get-all", App.findAll);

  app.get("/transacao/:transactionId", App.findOne);

  app.put("/transacao/:transactionId", App.update);

  app.delete("/transacao/:transactionId", App.delete);

  const Categoria = require("../controllers/app.controller.categoria.js");

  app.get("/categoria", Categoria.listar);
};
