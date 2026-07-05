const jwt = require("jsonwebtoken");

const { handleDBError } = require("../utilities");

const { userRepository } = require("../repositories");

const prisma = require("../../prismaClient");

const errorNotif = {
  success: "false",
  category: "Authorization",
};

const checkToken = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    return res.status(500).json({
      ...errorNotif,
      message: "ACCESS_TOKEN_SECRET is not defined in env variables.",
    });
  }

  if (!accessToken) {
    return res.status(401).json({
      ...errorNotif,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(accessToken, secret);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({
      ...errorNotif,
      message: "Token invalid or expired",
    });
  }
};

const checkIsAdmin = async (req, res, next) => {
  if (!req.user)
    return res.status(401).json({
      ...errorNotif,
      message: "User identity unknown",
    });

  const username = req.user.username;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { userRoles: { include: { role: true } } },
    });

    const roles = user.userRoles.map((ur) => ur.role.name);

    if (!user) {
      return res.status(401).json({ error: "User not found " });
    }

    if (!roles.find((role) => role.toLowerCase().trim() === "admin"))
      return res.status(403).json({
        ...errorNotif,
        message: "Admin role required for this resource",
      });

    next();
  } catch (err) {
    handleDBError(err, res, "users");
  }
};

const checkIsActive = async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      ...errorNotif,
      message: "User identity unknown.",
    });
  }

  const user = await userRepository.findByUsername(req.user.username);
  if (!user) {
    return res.status(404).json({ error: "User not found " });
  }

  if (!user.is_active)
    return res.status(403).json({
      ...errorNotif,
      message: "Your account is not activated or has been suspended.",
    });

  next();
};

const requireActiveUser = [checkToken, checkIsActive];
const requireAdmin = [checkToken, checkIsActive, checkIsAdmin];

module.exports = {
  checkToken,
  checkIsAdmin,
  checkIsActive,
  requireActiveUser,
  requireAdmin,
};
