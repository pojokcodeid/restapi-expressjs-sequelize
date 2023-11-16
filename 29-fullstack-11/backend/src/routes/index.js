import express from "express";
import userRouter from "./userRouter.js";
import { errorHandling } from "../controllers/errorHandling.js";
import contactRouter from "./contactRouter.js";
import addressRouter from "./addressRouter.js";
const router = express.Router();

router.use("/api", userRouter);
router.use("/api", contactRouter);
router.use("/api", addressRouter);

router.use("*", errorHandling);
router.use("*", (req, res, next) => {
  res.status(404).json({
    errors: ["Page Not found"],
    message: "Internal server error",
    data: null,
  });
});

export default router;
