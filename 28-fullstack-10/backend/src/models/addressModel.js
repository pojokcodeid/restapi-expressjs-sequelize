import { Sequelize } from "sequelize";
import sequelize from "../utils/db.js";
import Contact from "./contactModel.js";

const Address = sequelize.define(
  "Address",
  {
    addressId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    addressType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
    },
    province: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    zipCode: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "address",
    underscored: true,
  }
);

Contact.hasMany(Address, {
  foreignKey: "contactId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Address.belongsTo(Contact, {
  foreignKey: "contactId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

sequelize.sync();

export default Address;
