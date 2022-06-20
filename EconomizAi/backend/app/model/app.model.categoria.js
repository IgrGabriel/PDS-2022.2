const mongoose = require("mongoose");

const Categorias = mongoose.Schema({
  categoria: String,
  tipo: String,
});

module.exports = mongoose.model("Categoria", Categorias);
