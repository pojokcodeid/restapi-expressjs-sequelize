import Address from "../models/addressModel.js";
import { dataValid } from "../validation/dataValidation.js";

const getAddress = async (req, res, next) => {
  try {
    const address = await Address.findAll({});
    if (!address) {
      return res.status(404).json({
        errors: ["Address not found"],
        message: "Get Address Field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Get Address successfully",
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
    const address = await Address.findOne({
      where: {
        addressId: id,
      },
    });
    if (!address) {
      return res.status(404).json({
        errors: ["Address not found"],
        message: "Get Address Field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Get Address successfully",
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

const addNewAddress = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const validAddress = {
      addressType: "required",
      street: "required",
    };
    const address = await dataValid(validAddress, req.body);
    if (address.message.length > 0) {
      return res.status(400).json({
        errors: address.message,
        message: "Add New Address Field",
        data: address.data,
      });
    }
    const result = await Address.create({ ...address.data, contactId });
    if (!result) {
      return res.status(404).json({
        errors: ["Address not found"],
        message: "Add New Address Field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Address added successfully",
      data: address.data,
    });
  } catch (error) {
    next(
      new Error(
        "controllers/addressController.js:addNewAddress - " + error.message
      )
    );
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validAddress = {
      addressType: "required",
      street: "required",
    };
    const address = await dataValid(validAddress, req.body);
    if (address.message.length > 0) {
      return res.status(400).json({
        errors: address.message,
        message: "Update Address Field",
        data: address.data,
      });
    }
    const result = await Address.update(
      { ...address.data },
      {
        where: {
          addressId: id,
        },
      }
    );
    if (!result) {
      return res.status(404).json({
        errors: ["Address not found"],
        message: "Update Address Field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Address updated successfully",
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

const deleteAddress = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Address.destroy({
      where: {
        addressId: id,
      },
    });
    if (!result) {
      return res.status(404).json({
        errors: ["Address not found"],
        message: "Delete Address Field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Address deleted successfully",
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

export {
  getAddress,
  getAddressById,
  updateAddress,
  addNewAddress,
  deleteAddress,
};
