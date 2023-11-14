import User from "../models/userModel.js";
import { sendMail, sendPassword } from "../utils/sendMail.js";
import { Op } from "sequelize";
import sequelize from "../utils/db.js";
import { compare } from "../utils/bcript.js";
import {
  generateAccessToken,
  generateRefreshToken,
  parseJwt,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { dataValid } from "../validation/dataValidation.js";
import { Entropy, charset32 } from "entropy-string";
import { isExists } from "../validation/sanitization.js";

const setUser = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const valid = {
      name: "requered",
      email: "requered,isEmail",
      password: "requered,isStrongPassword",
      conformPassword: "requered",
    };
    const users = await dataValid(valid, req.body);
    if (users.data.password !== users.data.conformPassword) {
      users.message.push("Password not match");
    }
    if (users.message.length > 0) {
      return res.status(400).json({
        errors: users.message,
        message: "Register field",
        data: users.data,
      });
    }
    // validasi user
    const checkUser = await User.findAll({
      where: {
        email: {
          [Op.eq]: users.data.email,
        },
      },
    });
    if (checkUser.length > 0 && checkUser[0].isActive) {
      return res.status(400).json({
        errors: ["Email already activated"],
        message: "Register field",
        data: users.data,
      });
    } else if (
      checkUser.length > 0 &&
      !checkUser[0].isActive &&
      Date.parse(checkUser[0].expireTime) > new Date()
    ) {
      return res.status(400).json({
        errors: ["Email already registered, please check your email"],
        message: "Register field",
        data: users.data,
      });
    } else {
      // hapus register data
      User.destroy(
        {
          where: {
            email: users.data.email,
          },
        },
        {
          transaction: t,
        }
      );
    }

    const outData = await User.create(
      {
        ...users.data,
        expireTime: new Date(),
      },
      { transaction: t }
    );
    const result = await sendMail(outData.email, outData.userId);
    if (!result) {
      await t.rollback();
      return res.status(400).json({
        errors: ["Email not found"],
        message: "Register field",
        data: users.data,
      });
    } else {
      await t.commit();
      res.status(200).json({
        errors: [],
        message: "Register success, please check your email",
        data: {
          user_id: outData.userId,
          name: outData.name,
          email: outData.email,
          expireTime: outData.expireTime.toString(),
        },
      });
    }
  } catch (error) {
    await t.rollback();
    next(new Error("controllers/userController.js:setUser - " + error.message));
  }
};

const getUser = async (req, res) => {
  const users = await User.findAll({});
  res.json(users);
};

const setActivateUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    // dapatkan data user yang masih inactive
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
        message: "Activate user field",
        data: null,
      });
    } else {
      user.isActive = true;
      user.expireTime = null;
      await user.save();
      return res.status(200).json({
        errors: [],
        message: "Activate user success",
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

const setLogin = async (req, res, next) => {
  try {
    const valid = {
      email: "requered,isEmail",
      password: "requered",
    };
    const user = await dataValid(valid, req.body);
    const data = user.data;
    if (user.message.length > 0) {
      return res.status(400).json({
        errors: user.message,
        message: "Login field",
        data: data,
      });
    } else {
      // get user with email
      const user = await User.findOne({
        where: {
          email: data.email,
          isActive: true,
        },
      });
      // check user
      if (!user) {
        return res.status(404).json({
          errors: ["User not found"],
          message: "Login field",
          data: data,
        });
      }
      // check password
      if (compare(data.password, user.password)) {
        // generate token
        const usr = {
          userId: user.userId,
          name: user.name,
          email: user.email,
        };
        const token = generateAccessToken(usr);
        const refresh = generateRefreshToken(usr);
        return res.status(200).json({
          errors: [],
          message: "Login success",
          data: {
            userId: user.userId,
            name: user.name,
            email: user.email,
          },
          acessToken: token,
          refreshToken: refresh,
        });
      } else {
        return res.status(400).json({
          errors: ["Wrong password"],
          message: "Login field",
          data: data,
        });
      }
    }
  } catch (error) {
    next(
      new Error("controllers/userController.js:setLogin - " + error.message)
    );
  }
};

const setRefreshToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        errors: ["Invalid token"],
        message: "No token provided",
        data: null,
      });
    }
    const verify = verifyRefreshToken(token);
    if (!verify) {
      return res.status(401).json({
        errors: ["Invalid token"],
        message: "Provided token is not valid",
        data: null,
      });
    }
    let data = parseJwt(token);
    const user = await User.findOne({
      where: {
        email: data.email,
        isActive: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        errors: ["User not found"],
        message: "Provided token is not valid",
        data: null,
      });
    } else {
      const usr = {
        userId: user.userId,
        name: user.name,
        email: user.email,
      };
      const token = generateAccessToken(usr);
      const refresh = generateRefreshToken(usr);
      return res.status(200).json({
        errors: [],
        message: "Refresh success",
        data: {
          userId: user.userId,
          name: user.name,
          email: user.email,
        },
        acessToken: token,
        refreshToken: refresh,
      });
    }
  } catch (error) {
    next(
      new Error(
        "controllers/userController.js:setRefreshToken - " + error.message
      )
    );
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const valid = {};
    if (isExists(req.body.name)) {
      valid.name = "requered";
    }
    if (isExists(req.body.email)) {
      valid.email = "requered,isEmail";
    }
    if (isExists(req.body.password)) {
      valid.password = "requered,isStrongPassword";
      valid.confirmPassword = "requered";
    }
    const user = await dataValid(valid, req.body);
    if (
      isExists(user.data.password) &&
      user.data.password !== user.data.confirmPassword
    ) {
      user.message.push("Password not match");
    }
    if (user.message.length > 0) {
      return res.status(400).json({
        errors: user.message,
        message: "Update user field",
        data: user.data,
      });
    }
    const result = await User.update(
      {
        ...user.data,
      },
      {
        where: {
          userId: user_id,
        },
      }
    );
    if (result[0] == 0) {
      return res.status(404).json({
        errors: ["User not found"],
        message: "Update user field",
        data: user.data,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Update user success",
      data: user.data,
    });
  } catch (error) {
    next(
      new Error("controllers/userController.js:updateUser - " + error.message)
    );
  }
};

const deleteUser = (req, res, next) => {
  try {
    const user_id = req.params.id;
    const userDelete = User.destroy({
      where: {
        userId: user_id,
      },
    });
    if (!userDelete) {
      return res.status(404).json({
        errors: ["User not found"],
        message: "Delete user field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Delete user success",
      data: null,
    });
  } catch (error) {
    next(
      new Error("controllers/userController.js:deleteUser - " + error.message)
    );
  }
};

const forgotPassword = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const valid = {
      email: "requered,isEmail",
    };
    const userData = await dataValid(valid, req.body);
    if (userData.message.length > 0) {
      return res.status(400).json({
        errors: userData.message,
        message: "Forgot password field",
        data: userData.data,
      });
    }
    const user = await User.findOne({
      where: {
        email: userData.data.email,
      },
    });
    if (!user) {
      await t.rollback();
      return res.status(404).json({
        errors: ["User not found"],
        message: "Forgot password field",
        data: null,
      });
    }
    // dapatkan random password
    const random = new Entropy({ bits: 60, charset: charset32 });
    const stringPwd = random.string();
    // update password
    await User.update(
      {
        password: stringPwd,
      },
      {
        where: {
          user_id: user.userId,
        },
        transaction: t,
      }
    );
    const result = await sendPassword(userData.data.email, stringPwd);
    if (!result) {
      await t.rollback();
      return res.status(400).json({
        errors: ["Email not found"],
        message: "Forgot password field",
        data: null,
      });
    }
    await t.commit();
    return res.status(200).json({
      errors: [],
      message: "Forgot password success, please check your email",
      data: null,
    });
  } catch (error) {
    await t.rollback();
    next(
      new Error(
        "controllers/userController.js:forgotPassword - " + error.message
      )
    );
  }
};

export {
  setUser,
  getUser,
  setActivateUser,
  setLogin,
  setRefreshToken,
  updateUser,
  deleteUser,
  forgotPassword,
};
