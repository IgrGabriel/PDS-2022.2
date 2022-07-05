const Categoria = require("../model/app.model.categoria.js");
const authMiddleware = require("../middlewares/app.middleware.auth.js");

//Criando e salvando uma nova categoria
exports.create = (req, res) => {
  const category = new Categoria({
    id: req.params._id,
    categoria : req.body.categoria,
    tipo : req.body.tipo,
  });
  category
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
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
      res.status(500).send({
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
      if(!data) {
        return res.status(404).send({
          message:
            "Categoria não foi encontrada com o id " + 
            req.params.categoryId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if(err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Categoria não encontrada com o id " +
            req.params.categoryId,
        });
    }
    return res.status(500).send({
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
      if(!data) {
        return res.status(404).send({
          message:
            "Categoria não foi encontrada com o id " + 
            req.params.categoryId,
        });
      }
      res.send({message: "Categoria removida com sucesso!"});
    })
    .catch((err) => {
      if(err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Categoria não encontrada com o id " +
            req.params.categoryId,
        });
      }
      return res.status(500).send({
        message: 
        "Ocorreu algum erro ao remover a categoria com o id " +
         req.params.categoryId,
      });
    });
};