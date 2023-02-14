const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();
    res.send(list);
  } catch (error) {
    res.status(500).json({
      message: "Произошла ошибка. попробуйте позже",
    });
  }
});
module.exports = router;
