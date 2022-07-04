const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
    min: 0,
  },
  descricao: {
    type: String,
    default: "Sem descrição",
  },
  tipo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transacoes", TransactionSchema);
