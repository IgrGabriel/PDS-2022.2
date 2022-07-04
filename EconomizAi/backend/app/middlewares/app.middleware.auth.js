const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
  // buscar o header de autorização da requisição
  const authHeader = req.headers.authorization;

  // verifica se o token foi informado
  if (!authHeader)
    return res.status(401).send({ error: "O token não foi informado" });

  const parts = authHeader.split(" ");

  // verifica se o token tem duas partes
  if (!parts.lenght === 2)
    return res.status(401).send({ error: "Erro no token" });

  const [scheme, token] = parts;

  // Regex para verificar se scheme tem a palavra Bearer
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Erro de formatação" });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token inválido" });

    req.userId = decoded.id;
    return next();
  });
};
