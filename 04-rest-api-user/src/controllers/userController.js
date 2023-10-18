import sequelize from "../utils/db.js";
import User from "../models/userModel.js";
const setUser = async (req, res, next) => {
  try {
    const t = await sequelize.transaction();
    const user = req.body;
    const newUser = await User.create(
      {
        ...user,
        expireTime: new Date(),
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    res.status(201).json({
      errors: null,
      message: "User created successfully",
      data: {
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,
        expireTime: newUser.expireTime,
      },
    });
  } catch (error) {
    next(new Error("controllers/userController.js:setUser: " + error.message));
  }
};

export { setUser };
