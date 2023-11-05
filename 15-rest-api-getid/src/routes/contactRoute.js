import express from "express";
import { autenticate } from "../controllers/errorHandlingController.js";
import {
  setContact,
  getContact,
  getContactById,
} from "../controllers/contactController.js";
const contactRouter = express.Router();

contactRouter.post("/contacts", autenticate, setContact);
contactRouter.get("/contacts", autenticate, getContact);
contactRouter.get("/contacts/:id", autenticate, getContactById);

export default contactRouter;
