const mongoose = require("mongoose");

const Transaction = mongoose.Schema({
  data: String,
  categoria: String,
  valor: Number,
  descricao: String,
  tipo: String,
});

module.exports = mongoose.model("App", Transaction);
