import express from "express";
import { autenticate } from "../controllers/errorHandlingController.js";
import { setContact, getContact } from "../controllers/contactController.js";
const contactRouter = express.Router();

contactRouter.post("/contacts", autenticate, setContact);
contactRouter.get("/contacts", autenticate, getContact);

export default contactRouter;
