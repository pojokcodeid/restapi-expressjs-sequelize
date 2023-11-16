import Address from "../models/addressModel.js";
import { dataValid } from "../validation/dataValidation.js";

const getAddress = async (req, res, next) => {
  try {
    const address = await Address.findAll({});
    if (!address) {
      return res.status(404).json({
        errors: ["Address not found"],
        message: "Get Address field",
        data: null,
      });
    }
    res.status(200).json({
      errors: [],
      message: "Address success",
      data: address,
    });
  } catch (error) {
    next(
      new Error(
        "controllers/addressController.js:getAddress - " + error.message
      )
    );
  }
};

const getAddressById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const address = await Address.findAll({
      where: {
        addressId: id,
      },
    });
    if (!address || address.length === 0) {
      return res.status(404).json({
        errors: ["Address not found"],
        message: "Get Address field",
        data: null,
      });
    }
    res.status(200).json({
      errors: [],
      message: "Address success",
      data: address,
    });
  } catch (error) {
    next(
      new Error(
        "controllers/addressController.js:getAddressById - " + error.message
      )
    );
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validAddress = {
      addressType: "requered",
      street: "requered",
      province: "requered",
      country: "requered",
    };
    const address = await dataValid(validAddress, req.body);
    if (address.message.length > 0) {
      return res.status(400).json({
        errors: address.message,
        message: "Update Address field",
        data: address.data,
      });
    }
    const result = await Address.update(
      {
        ...address.data,
      },
      {
        where: {
          addressId: id,
        },
      }
    );
    if (!result) {
      return res.status(404).json({
        errors: ["Address not found"],
        message: "Update Address field",
        data: null,
      });
    }
    res.status(200).json({
      errors: [],
      message: "Address success",
      data: address.data,
    });
  } catch (error) {
    next(
      new Error(
        "controllers/addressController.js:updateAddress - " + error.message
      )
    );
  }
};

const deleteAddress = (req, res, next) => {
  try {
    const id = req.params.id;
    const addressDelete = Address.destroy({
      where: {
        addressId: id,
      },
    });
    if (!addressDelete) {
      return res.status(404).json({
        errors: ["Address not found"],
        message: "Delete Address field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Delete Address success",
      data: null,
    });
  } catch (error) {
    next(
      new Error(
        "controllers/addressController.js:deleteAddress - " + error.message
      )
    );
  }
};

const addNewAddress = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const validAddress = {
      addressType: "requered",
      street: "requered",
      province: "requered",
      country: "requered",
    };
    const address = await dataValid(validAddress, req.body);
    if (address.message.length > 0) {
      return res.status(400).json({
        errors: address.message,
        message: "Add New Address field",
        data: address.data,
      });
    }
    const result = await Address.create({
      ...address.data,
      contactId: contactId,
    });
    if (!result) {
      return res.status(404).json({
        errors: ["Address not found"],
        message: "Add New Address field",
        data: null,
      });
    }
    res.status(200).json({
      errors: [],
      message: "Add New Address success",
      data: result,
    });
  } catch (error) {
    next(
      new Error(
        "controllers/addressController.js:addNewAddress - " + error.message
      )
    );
  }
};

export {
  getAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  addNewAddress,
};
