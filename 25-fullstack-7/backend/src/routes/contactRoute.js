import express from "express";
import { autenticate } from "../controllers/errorHandlingController.js";
import {
  setContact,
  getContact,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";
const contactRouter = express.Router();

contactRouter.post("/contacts", autenticate, setContact);
contactRouter.get("/contacts", autenticate, getContact);
contactRouter.get("/contacts/:id", autenticate, getContactById);
contactRouter.put("/contacts/:id", autenticate, updateContact);
contactRouter.delete("/contacts/:id", autenticate, deleteContact);

export default contactRouter;
