import express from "express";
import { autenticate } from "../controllers/errorHandlingController.js";
import {
  getAddress,
  getAddressById,
  updateAddress,
  addNewAddress,
  deleteAddress,
} from "../controllers/addressController.js";
const addressRouter = express.Router();

addressRouter.get("/addresses", autenticate, getAddress);
addressRouter.get("/addresses/:id", autenticate, getAddressById);
addressRouter.put("/addresses/:id", autenticate, updateAddress);
addressRouter.post("/addresses/:id", autenticate, addNewAddress);
addressRouter.delete("/addresses/:id", autenticate, deleteAddress);

export default addressRouter;
