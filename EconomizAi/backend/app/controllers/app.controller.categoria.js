const Categoria = require("../model/app.model.categoria.js");
const authMiddleware = require("../middlewares/app.middleware.auth.js");

//Criando e salvando uma nova categoria
exports.create = (req, res) => {
  const category = new Categoria({
    id: req.params._id,
    categoria: req.body.categoria,
    tipo: req.body.tipo,
    user: req.userId,
  });
  category
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Ocorreu algum erro ao adicionar a categoria",
      });
    });
};

//Buscando todas as categorias cadastradas
exports.findAll = (req, res) => {
  Categoria.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Ocorreu algum erro ao buscar as categorias",
      });
    });
};

//Atualizando uma categoria já cadastrada
exports.update = (req, res) => {
  Categoria.findByIdAndUpdate(
    req.params.categoryId,
    {
      categoria: req.body.categoria,
      tipo: req.body.tipo,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message:
            "Categoria não foi encontrada com o id " + req.params.categoryId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Categoria não encontrada com o id " + req.params.categoryId,
        });
      }
      return res.status(400).send({
        message:
          "Ocorreu algum erro ao atualizar a categoria com o id " +
          req.params.categoryId,
      });
    });
};

//Deletando uma categoria com um id especificado na requisição
exports.delete = (req, res) => {
  Categoria.findByIdAndRemove(req.params.categoryId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message:
            "Categoria não foi encontrada com o id " + req.params.categoryId,
        });
      }
      res.send({ message: "Categoria removida com sucesso!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Categoria não encontrada com o id " + req.params.categoryId,
        });
      }
      return res.status(400).send({
        message:
          "Ocorreu algum erro ao remover a categoria com o id " +
          req.params.categoryId,
      });
    });
};

// Buscar todas as categorias do tipo despesa
exports.findAllExpense = (req, res) => {
  Categoria.find({ tipo: "despesa" })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Ocorreu algum erro ao buscar as transações",
      });
    });
};

// Buscar todas as categorias do tipo receita
exports.findAllRevenue = (req, res) => {
  Categoria.find({ tipo: "receita" })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Ocorreu algum erro ao buscar as transações",
      });
    });
};

// Listar as categorias criadas pelo usuario passando o id dele como parametro
exports.listCategoryUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const categoria = await Categoria.find({
      user: req.params.userId,
    }).populate("user");

    return res.status(200).send({ categoria });
  } catch (err) {
    return res.status(404).send({ error: "Erro ao buscar transação" });
  }
};
