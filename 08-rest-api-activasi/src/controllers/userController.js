import sequelize from "../utils/db.js";
import { dataValid } from "../validation/dataValidation.js";
import { sendMail } from "../utils/sendMail.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";
const setUser = async (req, res, next) => {
  const t = await sequelize.transaction();
  const valid = {
    name: "required",
    email: "required,isEmail",
    password: "required,isStrongPassword",
  };
  try {
    // const user = req.body;
    const user = await dataValid(valid, req.body);
    if (user.message.length > 0) {
      return res.status(400).json({
        errors: user.message,
        message: "Register Field",
        data: null,
      });
    }
    const userExists = await User.findAll({
      where: {
        email: user.data.email,
      },
    });
    if (userExists.length > 0 && userExists[0].isActive) {
      return res.status(400).json({
        errors: ["Email already activated"],
        message: "Register Field",
        data: null,
      });
    } else if (
      userExists.length > 0 &&
      !userExists[0].isActive &&
      Date.parse(userExists[0].expireTime) > new Date()
    ) {
      return res.status(400).json({
        errors: ["Email already registered, please check your email"],
        message: "Register Field",
        data: null,
      });
    } else {
      User.destroy(
        {
          where: {
            email: user.data.email,
          },
        },
        {
          transaction: t,
        }
      );
    }
    const newUser = await User.create(
      {
        ...user.data,
        expireTime: new Date(),
      },
      {
        transaction: t,
      }
    );
    const result = await sendMail(newUser.email, newUser.userId);
    if (!result) {
      await t.rollback();
      return res.status(500).json({
        errors: ["Send email failed"],
        message: "Register Field",
        data: null,
      });
    } else {
      await t.commit();
      res.status(201).json({
        errors: null,
        message: "User created, please check your email",
        data: {
          userId: newUser.userId,
          name: newUser.name,
          email: newUser.email,
          expireTime: newUser.expireTime.toString(),
        },
      });
    }
  } catch (error) {
    await t.rollback();
    next(new Error("controllers/userController.js:setUser - " + error.message));
  }
};

const setActivateUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const user = await User.findOne({
      where: {
        userId: user_id,
        isActive: false,
        expireTime: {
          [Op.gte]: new Date(),
        },
      },
    });
    if (!user) {
      return res.status(404).json({
        errors: ["User not found or expired"],
        message: "Activate User Field",
        data: null,
      });
    } else {
      user.isActive = true;
      user.expireTime = null;
      await user.save();
      return res.status(200).json({
        errors: [],
        message: "User activated successfully",
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    next(
      new Error(
        "controllers/userController.js:setActivateUser - " + error.message
      )
    );
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.status(200).json({
      errors: [],
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(new Error("controllers/userController.js:getUser - " + error.message));
  }
};

export { setUser, setActivateUser, getUser };
