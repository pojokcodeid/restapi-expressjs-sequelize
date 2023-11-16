import logger from "../middleware/winston.js";
import { verifyAccessToken } from "../utils/jwt.js";

const errorHandling = (err, req, res, next) => {
  const message = err.message.split(" - ")[1];
  logger.error(err);
  res.status(500).json({
    errors: [message],
    message: "Internal server error",
    data: null,
  });
};

const autenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      errors: ["No token provided"],
      message: "Verify token field",
      data: null,
    });
  }
  const user = verifyAccessToken(token);
  if (!user) {
    return res.status(401).json({
      errors: ["Invalid token"],
      message: "Verify token field",
      data: null,
    });
  }

  req.user = user;
  next();
};

export { errorHandling, autenticate };
