import express from "express";
import {
  setUser,
  setActivateUser,
  getUser,
  setLogin,
  setRefreshToken,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/users", setUser);
userRouter.get("/users", getUser);
userRouter.get("/users/activate/:id", setActivateUser);
userRouter.post("/users/login", setLogin);
userRouter.get("/users/refresh", setRefreshToken);

export default userRouter;
