import express from "express";
import {
  deleteContact,
  getContact,
  getContactById,
  setContact,
  updateContact,
} from "../controllers/contactController.js";
import { autenticate } from "../controllers/errorHandling.js";
const contactRouter = express.Router();

contactRouter.post("/contacts", autenticate, setContact);
contactRouter.get("/contacts", autenticate, getContact);
contactRouter.get("/contacts/:id", autenticate, getContactById);
contactRouter.put("/contacts/:id", autenticate, updateContact);
contactRouter.delete("/contacts/:id", autenticate, deleteContact);

export default contactRouter;
