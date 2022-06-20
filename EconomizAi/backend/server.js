const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// Variaves de ambiente
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

// Conectando com o BD
mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.wwgql.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Nao foi possivel conectar-se ao banco de dados. Erro...", err);
    process.exit();
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "O servidor esta rodadando" });
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const PORT = 8080;

require("./app/routes/app.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
