import { Sequelize } from "sequelize";
import sequelize from "../utils/db.js";
import User from "./userModel.js";

const Contact = sequelize.define(
  "Contact",
  {
    contactId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    fullName: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    email: {
      type: Sequelize.STRING,
      set(value) {
        if (value !== null || value !== "") {
          this.setDataValue("email", value.toLowerCase());
        }
      },
    },
    phone: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "contact",
    underscored: true,
  }
);

User.hasMany(Contact, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Contact.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

sequelize.sync();

export default Contact;
