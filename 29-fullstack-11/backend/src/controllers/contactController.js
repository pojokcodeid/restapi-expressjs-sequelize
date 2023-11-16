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
    delete contact["Addresses"];
    // validasi contacts
    const validContact = {
      firstName: "requered",
    };
    contact = await dataValid(validContact, contact);
    lstError.push(...contact.message);
    // validasi untuk address
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
      address: dtl,
    };

    // jika ada error
    if (lstError.length > 0) {
      await t.rollback();
      return res.status(400).json({
        errors: lstError,
        message: "Create Contact field",
        data: contact,
      });
    }
    // jika tidak ada error
    const creteContact = await Contact.create(contact, { transaction: t });
    const creteAddress = await Promise.all(
      contact.address.map(async (item) => {
        return await Address.create(
          {
            ...item,
            contactId: creteContact.contactId,
          },
          {
            transaction: t,
          }
        );
      })
    );
    if (!creteContact || !creteAddress) {
      await t.rollback();
      return res.status(400).json({
        errors: ["Contact not found"],
        message: "Create Contact field",
        data: contact,
      });
    }
    await t.commit();
    return res.status(200).json({
      errors: [],
      message: "Contact success",
      data: { ...creteContact.dataValues, address: creteAddress },
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
    // persiapkan filter
    const contacts = req.body;
    let address = [];
    if (isExists(contacts.Addresses)) {
      address = contacts.Addresses;
      delete contacts["Addresses"];
    }
    // filter address
    let objFilter = {};
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
    let objContact = {};
    const filterContact = await new Promise((resolve, reject) => {
      Object.entries(contacts).forEach(([key, value]) => {
        objContact = {
          ...objContact,
          [key]: {
            [Op.like]: "%" + value + "%",
          },
        };
      });
      resolve(objContact);
    });

    // cek apakah ada filter untuk address
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
      errors: null,
      message: "Contact success",
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
    // dapatkan id
    const id = req.params.id;
    console.log(id);
    // dapatkan contact dengan id
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
        message: "Get Contact field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Contact success",
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

const updateContact = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let lstError = [];
    const id = req.params.id; // dapatkan id yang akan diubah
    let contact = req.body; // dapatkan data untuk perubahan

    // siapkan data address
    let address = [];
    if (isExists(contact.Addresses)) {
      contact.Addresses.forEach((element) => {
        delete element.addressId;
        delete element.contactId;
        address.push(element);
      });
    }
    // hapus data yang tidak digunakan supaya tidak error
    delete contact["contactId"];
    delete contact["Addresses"];

    // buat rules validasi
    const validContact = {
      firstName: "requered",
    };
    // bersihkand data dan validasi
    contact = await dataValid(validContact, contact);
    // masukan pesan error kedalam lstError
    lstError.push(...contact.message);

    // validasi address
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

    // jika ada error dalam list
    if (lstError.length > 0) {
      await t.rollback();
      return res.status(400).json({
        errors: lstError,
        message: "Create Contact field",
        data: contact,
      });
    }

    // update data contact
    const resultUpd = await Contact.update(
      {
        ...contact.data,
      },
      {
        where: {
          contactId: id,
        },
        transaction: t,
      }
    );

    // hapus addess yang id ini
    const addressDelete = await Address.destroy({
      where: {
        contactId: id,
      },
      transaction: t,
    });

    // insert ulang address
    const insertAddress = await Promise.all(
      dtl.map(async (item) => {
        const result = await Address.create(
          {
            ...item,
            contactId: id,
          },
          {
            transaction: t,
          }
        );
        return result;
      })
    );

    // jika update dan insert tidak berhasil rollback
    if (!resultUpd || !insertAddress) {
      await t.rollback();
      return res.status(404).json({
        errors: ["Contact not found"],
        message: "Update Contact field",
        data: contact.data,
      });
    }

    // jika semua berhasil commit
    await t.commit();

    // kembalikan process berhasil
    return res.status(200).json({
      errors: [],
      message: "Update Contact success",
      data: contact.data,
    });
  } catch (error) {
    await t.rollback();
    next(
      new Error(
        "controllers/contactController.js:updateContact - " + error.message
      )
    );
  }
};

const deleteContact = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    // dapatkan id yang akan dihapus
    const id = req.params.id;

    // delete address
    const addressDelete = await Address.destroy({
      where: {
        contactId: id,
      },
      transaction: t,
    });

    // delete contact
    const contactDelete = await Contact.destroy({
      where: {
        contactId: id,
      },
      transaction: t,
    });

    // jika delete tidak berhasil rollback
    if (!contactDelete || !addressDelete) {
      await t.rollback();
      return res.status(404).json({
        errors: ["Contact not found"],
        message: "Delete Contact field",
        data: null,
      });
    }

    // jika semua berhasil commit
    await t.commit();

    // kembalikan process berhasil
    return res.status(200).json({
      errors: [],
      message: "Delete Contact success",
      data: null,
    });
  } catch (error) {
    await t.rollback();
    next(
      new Error(
        "controllers/contactController.js:deleteContact - " + error.message
      )
    );
  }
};

export { setContact, getContact, getContactById, updateContact, deleteContact };
