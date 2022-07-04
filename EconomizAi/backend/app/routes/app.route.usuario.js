module.exports = (app) => {
  const User = require("../controllers/auth.controller.usuario.js");

  app.post("/user", User.create);
  app.post("/user/auth", User.authenticate);
};
