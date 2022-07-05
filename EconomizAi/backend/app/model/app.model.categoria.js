const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  categoria: {
    type: String,
    unique: true,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

module.exports = mongoose.model("Categoria", CategorySchema);
