const { Schema, model } = require("mongoose");

const shema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("User", shema);
