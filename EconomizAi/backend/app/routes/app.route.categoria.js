module.exports = (app) => {
  const Categoria = require("../controllers/app.controller.categoria.js");
  const authMiddleware = require("../middlewares/app.middleware.auth.js");

  app.use(authMiddleware);

  app.post("/categoria", Categoria.create);

  app.get("/categoria", Categoria.findAll);

  app.put("/categoria/:categoryId", Categoria.update);

  app.delete("/categoria/:categoryId", Categoria.delete);

  app.get("/categoria/tipo/despesas", Categoria.findAllExpense);

  app.get("/categoria/tipo/receitas", Categoria.findAllRevenue);
};
