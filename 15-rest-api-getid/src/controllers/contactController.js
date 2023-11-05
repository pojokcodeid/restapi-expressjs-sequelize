import { Op } from "sequelize";
import Address from "../models/addressModel.js";
import Contact from "../models/contactModel.js";
import sequelize from "../utils/db.js";
import { dataValid } from "../validation/dataValidation.js";
import { isExists } from "../validation/sanitization.js";

const setContact = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let lstError = [];
    // dapatkan data dari post
    let contact = req.body;
    let address = [];
    if (isExists(contact.Addresses)) {
      address = contact.Addresses;
    }
    delete contact.Addresses;
    // rule validasi contact
    const validContact = {
      firstName: "required",
    };
    contact = await dataValid(validContact, contact);
    lstError.push(...contact.message);
    // rule validasi address
    let dtl = await Promise.all(
      address.map(async (item) => {
        const addressClear = await dataValid(
          {
            addressType: "requered",
            street: "requered",
          },
          item
        );
        lstError.push(...addressClear.message);
        return addressClear.data;
      })
    );

    contact = {
      ...contact.data,
      userId: req.user.userId,
      Addresses: dtl,
    };

    // jika ada error kirimkan pesan
    if (lstError.length > 0) {
      return res.status(400).json({
        errors: lstError,
        message: "Create Contact field",
        data: contact,
      });
    }

    // jika tidak ada error
    const createContact = await Contact.create(contact, { transaction: t });
    const createAddress = await Promise.all(
      contact.Addresses.map(async (item) => {
        return await Address.create(
          {
            ...item,
            contactId: createContact.contactId,
          },
          {
            transaction: t,
          }
        );
      })
    );
    if (!createContact || !createAddress) {
      await t.rollback();
      return res.status(400).json({
        errors: ["Contact not found"],
        message: "Create Contact field",
        data: contact,
      });
    }
    await t.commit();
    return res.status(201).json({
      errors: [],
      message: "Contact created successfully",
      data: { ...createContact.dataValues, address: createAddress },
    });
  } catch (error) {
    await t.rollback();
    next(
      new Error(
        "controllers/contactController.js:setContact - " + error.message
      )
    );
  }
};

const getContact = async (req, res, next) => {
  try {
    // persiapan filter
    const contacts = req.body;
    let address = [];
    if (isExists(contacts.Addresses)) {
      address = contacts.Addresses;
      delete contacts.Addresses;
    }

    // filter address
    let objFilter = [];
    const filterAddress = await new Promise((resolve, reject) => {
      Object.entries(address).forEach(([key, value]) => {
        objFilter = {
          ...objFilter,
          [key]: {
            [Op.like]: "%" + value + "%",
          },
        };
      });
      resolve(objFilter);
    });

    // filter contact
    let objContact = [];
    const filterContact = await new Promise((resolve, reject) => {
      Object.entries(contacts).forEach(([key, value]) => {
        objFilter = {
          ...objContact,
          [key]: {
            [Op.like]: "%" + value + "%",
          },
        };
      });
      resolve(objFilter);
    });

    // cek ada filter atau tidak
    let data = null;
    if (Object.keys(filterAddress).length == 0) {
      data = await Contact.findAll({
        include: {
          model: Address,
        },
        where: filterContact,
      });
    } else {
      data = await Contact.findAll({
        include: {
          model: Address,
          where: filterAddress,
        },
        where: filterContact,
      });
    }

    res.json({
      errors: [],
      message: "Get Contact successfully",
      data: data,
    });
  } catch (error) {
    next(
      new Error(
        "controllers/contactController.js:getContact - " + error.message
      )
    );
  }
};

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findAll({
      include: {
        model: Address,
      },
      where: {
        contactId: id,
      },
    });
    if (!contact) {
      return res.status(404).json({
        errors: ["Contact not found"],
        message: "Get Contact Field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Get Contact successfully",
      data: contact,
    });
  } catch (error) {
    next(
      new Error(
        "controllers/contactController.js:getContactById - " + error.message
      )
    );
  }
};

export { setContact, getContact, getContactById };
