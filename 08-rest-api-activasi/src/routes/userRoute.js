import express from "express";
import {
  setUser,
  setActivateUser,
  getUser,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/users", setUser);
userRouter.get("/users", getUser);
userRouter.get("/users/activate/:id", setActivateUser);

export default userRouter;
