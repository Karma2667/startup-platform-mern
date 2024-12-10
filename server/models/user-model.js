const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String },
  avatar: { type: String },
  isActived: { type: Boolean, default: false },
  activaionLink: { type: String },
});

module.exports = model("User", UserSchema);
