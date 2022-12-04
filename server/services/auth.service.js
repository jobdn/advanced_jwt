const { hash } = require("bcrypt");
const { v4 } = require("uuid");

const mailService = require("./mail.service");
const tokenService = require("./token.service");

const ApiError = require("../exceptions/api");
const { UserDto } = require("../dtos");

const UserModel = require("../models/user");

class AuthService {
  async registerUser(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) throw ApiError.BadRequestError("User already exists");

    // Create a user
    const hashedPassword = await hash(password, 3);
    const activationLink = v4();
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      activationLink,
    });

    // Send mail to the created user
    await mailService.sendActivationMail(
      email,
      `${process.env.SERVER_URL}/auth/activate/${user.activationLink}`
    );

    // Generate tokens
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activateUserBy(link) {
    const existentUser = await UserModel.findOne({ activationLink: link });

    if (!existentUser)
      throw ApiError.BadRequestError("There is not such user!!!");

    existentUser.isActivated = true;
    await existentUser.save();
  }
}

module.exports = new AuthService();
