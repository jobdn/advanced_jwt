const { hash } = require("bcrypt");

const mailService = require("./mail.service");
const tokenService = require("./token.service");

const { UserDto } = require("../dtos");

const UserModel = require("../models/user");

class AuthService {
  async registerUser(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) throw new Error("User already exists");

    // Create a user
    const hashedPassword = await hash(password, 3);
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      activationLink: hashedPassword,
    });

    // Send mail to the created user
    await mailService.sendActivationMail(email, hashedPassword);

    // Generate tokens
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new AuthService();
