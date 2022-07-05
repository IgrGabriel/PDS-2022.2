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
});

module.exports = mongoose.model("Categoria", CategorySchema);
