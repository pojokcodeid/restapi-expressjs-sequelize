import express from "express";
import {
  addNewAddress,
  deleteAddress,
  getAddress,
  getAddressById,
  updateAddress,
} from "../controllers/addressController.js";
import { autenticate } from "../controllers/errorHandling.js";
const addressRouter = express.Router();

addressRouter.get("/addresses", autenticate, getAddress);
addressRouter.get("/addresses/:id", autenticate, getAddressById);
addressRouter.put("/addresses/:id", autenticate, updateAddress);
addressRouter.delete("/addresses/:id", autenticate, deleteAddress);
addressRouter.post("/addresses/:id", autenticate, addNewAddress);

export default addressRouter;
