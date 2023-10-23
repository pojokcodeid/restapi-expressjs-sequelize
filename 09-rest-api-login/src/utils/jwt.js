import jsonWebToken from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (user) => {
  return jsonWebToken.sign(user, process.env.JWT_SECERET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1800s",
  });
};

const generateRefreshToken = (user) => {
  return jsonWebToken.sign(user, process.env.JWT_REFRESH_SECERET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "86400s",
  });
};

export { generateAccessToken, generateRefreshToken };
