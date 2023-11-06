import logger from "../middleware/winston.js";
import { verifyAccessToken } from "../utils/jwt.js";

const errorrHandling = (err, req, res) => {
  const message = err.message.split(" - ")[1];
  logger.error(err);
  res.status(500).json({
    errors: [message],
    message: "Internal Server Error",
    data: null,
  });
};

const autenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      errors: ["Token not found"],
      message: "Verify Field",
      data: null,
    });
  }
  const user = verifyAccessToken(token);
  if (!user) {
    return res.status(401).json({
      errors: ["Invalid token"],
      message: "Verify Field",
      data: null,
    });
  }
  req.user = user;
  next();
};

export { errorrHandling, autenticate };
