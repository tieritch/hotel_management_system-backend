const jwt = require("jsonwebtoken");

/*const auth = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessToken) {
    return res.status(401).json({ error: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(accessToken, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "token invalid or expired" });
  }
};*/

let auth = (req, res, next) => {
  // 1. Récupération du jeton (nécessite le middleware 'cookie-parser' dans index.js)
  const accessToken = req.cookies?.accessToken;
  const secret = process.env.ACCESS_TOKEN_SECRET;

  // Sécurité préventive : si la clé secrète est absente du fichier .env
  if (!secret) {
    console.error(
      "CRITICAL: ACCESS_TOKEN_SECRET is not defined in env variables."
    );
    return res.status(500).json({ error: "Internal server error" });
  }

  // 2. Vérification de la présence du cookie
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized: No cookie provided" });
  }

  try {
    // 3. Validation et décodage du JWT
    const decoded = jwt.verify(accessToken, secret);

    // 4. Transmission des infos au cycle de vie de la requête
    req.user = decoded;

    // 5. Passage au middleware/contrôleur suivant
    next();
  } catch (err) {
    // Statut 403 (Forbidden) : Le client a un jeton, mais il n'est plus valide/expiré
    return res
      .status(403)
      .json({ error: "Forbidden: Token invalid or expired" });
  }
};

/*const auth1 = (req, res, next) => {
  // 1. Récupération du jeton (nécessite le middleware 'cookie-parser' dans index.js)
  const accessToken = req.cookies?.accessToken;
  const secret = process.env.ACCESS_TOKEN_SECRET;

  // Sécurité préventive : si la clé secrète est absente du fichier .env
  if (!secret) {
    console.error(
      "CRITICAL: ACCESS_TOKEN_SECRET is not defined in env variables."
    );
    return res.status(500).json({ error: "Internal server error" });
  }

  // 2. Vérification de la présence du cookie
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized: No cookie provided" });
  }

  try {
    // 3. Validation et décodage du JWT
    const decoded = jwt.verify(accessToken, secret);

    // 4. Transmission des infos au cycle de vie de la requête
    req.user = decoded;

    // 5. Passage au middleware/contrôleur suivant
    next();
  } catch (err) {
    // Statut 403 (Forbidden) : Le client a un jeton, mais il n'est plus valide/expiré
    return res
      .status(403)
      .json({ error: "Forbidden: Token invalid or expired" });
  }
};*/

const auth1 = {
  naming() {},
};

module.exports = { auth };
