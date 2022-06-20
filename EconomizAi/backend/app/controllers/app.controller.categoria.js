const Categoria = require("../model/app.model.categoria.js");

exports.listar = (req, res) => {
  Categoria.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao buscar as categorias",
      });
    });
};
