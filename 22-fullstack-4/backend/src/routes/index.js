import express from "express";
import userRouter from "./userRoute.js";
import { errorrHandling } from "../controllers/errorHandlingController.js";
import contactRouter from "./contactRoute.js";
import addressRouter from "./addressRouter.js";
const route = express.Router();

route.use("/api", userRouter);
route.use("/api", contactRouter);
route.use("/api", addressRouter);
route.use("*", errorrHandling);
route.use("*", (req, res) => {
  res.status(404).json({
    errors: ["Page Not Found"],
    message: "Internal Server Error",
    data: null,
  });
});
export default route;
