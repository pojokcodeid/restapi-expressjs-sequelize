import express from "express";
import { autenticate } from "../controllers/errorHandlingController.js";
import { setContact } from "../controllers/contactController.js";
const contactRouter = express.Router();

contactRouter.post("/contacts", autenticate, setContact);

export default contactRouter;
