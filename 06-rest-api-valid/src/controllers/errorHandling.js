import logger from "../middleware/winston.js";

const errorrHandling = (err, req, res, next) => {
  const message = err.message.split(" - ")[1];
  logger.error(err);
  res.status(500).json({
    errors: [message],
    message: "Internal Server Error",
    data: null,
  });
};

export { errorrHandling };
