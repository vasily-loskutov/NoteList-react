const express = require("express");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const tokenService = require("../services/token.service");

router.post("/signUp", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exitingUser = await User.findOne({ email });
    console.log(req.body);
    if (exitingUser) {
      return res.status(400).json({
        message: "EMAIL_EXIST",
      });
    }
    const hasedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      ...req.body,
      password: hasedPassword,
    });
    const tokens = tokenService.generate({ _id: newUser._id });
    await tokenService.save(newUser._id, tokens.refreshToken);

    res.status(201).send({
      ...tokens,
      userId: newUser._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "На сервере произошла ошибка. Поробуйте позже",
    });
  }
});
router.post("/signInWithPassword", [
  check("email", "Email введён некорректно").isEmail(),
  check("password", "Пароль введён некорректно")
    .isLength({ min: 8 })
    .matches(/[a-zA-Z]/),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "INVALID_DATA",
          code: 400,
        });
      }
      const { email, password } = req.body;
      const exitingUser = await User.findOne({ email });
      if (!exitingUser) {
        return res.status(400).json({
          message: "EMAIL_NOT_FOUND",
          code: 400,
        });
      }
      const isPasswordEqual = await bcrypt.compare(
        password,
        exitingUser.password
      );
      if (!isPasswordEqual) {
        return res.status(400).json({
          message: "INVALID_PASSWORD",
          code: 400,
        });
      }
      const tokens = tokenService.generate({ _id: exitingUser._id });
      await tokenService.save(exitingUser._id, tokens.refreshToken);
      res.status(200).send({
        ...tokens,
        userId: exitingUser._id,
      });
    } catch (error) {
      return res.status(500).json({
        message: "На сервере произошла ошибка. Поробуйте позже",
      });
    }
  },
]);
function isValidToken(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}
router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);
    if (isValidToken(data, dbToken)) {
      return res.status(401).json({
        error: {
          message: "Unauthorized",
        },
      });
    }
    const tokens = tokenService.generate({ _id: data._id });
    await tokenService.save(data._id, tokens.refreshToken);
    res.status(200).send({
      ...tokens,
      userId: data._id,
    });
  } catch (err) {
    return res.status(500).json({
      message: "На сервере произошла ошибка. Поробуйте позже",
    });
  }
});

module.exports = router;
