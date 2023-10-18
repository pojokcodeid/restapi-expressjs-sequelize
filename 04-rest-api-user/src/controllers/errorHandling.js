const errorrHandling = (err, req, res, next) => {
  res.status(500).json({
    errors: [err],
    message: "Internal Server Error",
    data: null,
  });
};

export { errorrHandling };
