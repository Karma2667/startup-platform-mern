const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");

class UserService {
  async registration(email, password, name, role) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw new Error(
        `Пользователь с таким почтовым адресом "${email}"уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const activaionLink = uuid.v4();
    const user = await userModel.create({
      email,
      password: hashPassword,
      activaionLink,
      name,
      role,
    });
    await mailService.sendActivationMail(email, activaionLink);
    const tokens = tokenService.generateToken();
  }
}

module.exports = new UserService();
