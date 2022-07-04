const User = require("../model/app.model.usuario.js");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json");

// => Gerar os tokens de autenticacao
const genereteToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, // Validade de um dia
  });
};

// => Registrar um usuario no BD
exports.create = async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "Usuario já existe" });

    const user = await User.create(req.body);

    user.senha = undefined; // Não retornar a senha quando o usuario for criado

    return res.send({
      user,
      token: genereteToken({ id: user.id }),
    });
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Não foi possivel cadastrar usuario" });
  }
};

// => Autenticacao do usuario usando email e senha
exports.authenticate = async (req, res) => {
  const { email, senha } = req.body;

  const user = await User.findOne({ email }).select("+senha");

  if (!user) return res.status(400).send({ error: "Usuario não encontrado" });

  if (!(senha === user.senha))
    return res.status(400).send({ error: "Senha inválida" });

  user.senha = undefined;

  res.send({
    user,
    token: genereteToken({ id: user.id }),
  });
};
