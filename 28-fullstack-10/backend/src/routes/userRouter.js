import express from "express";
import {
  getUser,
  setUser,
  setActivateUser,
  setLogin,
  setRefreshToken,
  updateUser,
  deleteUser,
  forgotPassword,
} from "../controllers/userController.js";
import { autenticate } from "../controllers/errorHandling.js";
const userRouter = express.Router();

userRouter.post("/users", setUser);
userRouter.get("/users", getUser);
userRouter.get("/users/activate/:id", setActivateUser);
userRouter.post("/users/login", setLogin);
userRouter.get("/users/refresh", setRefreshToken);
userRouter.patch("/users/:id", autenticate, updateUser);
userRouter.delete("/users/:id", autenticate, deleteUser);
userRouter.post("/users/forgot-password", forgotPassword);

export default userRouter;
