module.exports = (app) => {
  const Categoria = require("../controllers/app.controller.categoria.js");
  const authMiddleware = require("../middlewares/app.middleware.auth.js");

  app.get("/categoria", Categoria.findAll);
};
