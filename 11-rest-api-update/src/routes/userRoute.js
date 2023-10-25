import express from "express";
import {
  setUser,
  setActivateUser,
  getUser,
  setLogin,
  setRefreshToken,
  updateUser,
} from "../controllers/userController.js";
import { autenticate } from "../controllers/errorHandlingController.js";
const userRouter = express.Router();

userRouter.post("/users", setUser);
userRouter.get("/users", getUser);
userRouter.get("/users/activate/:id", setActivateUser);
userRouter.post("/users/login", setLogin);
userRouter.get("/users/refresh", setRefreshToken);
userRouter.patch("/users/:id", autenticate, updateUser);

export default userRouter;
