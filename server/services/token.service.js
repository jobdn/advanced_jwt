const jwt = require("jsonwebtoken");

const RefreshTokenModel = require("../models/refresh-token");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "10d",
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId, refreshToken) {
    const existToken = await RefreshTokenModel.findOne({ userId });
    if (existToken) {
      existToken.token = refreshToken;
      existToken.save();

      return;
    }

    const token = await RefreshTokenModel.create({
      user: userId,
      token: refreshToken,
    });

    return token;
  }

  async removeRefreshToken(refreshToken) {
    const res = await RefreshTokenModel.findOneAndRemove({
      token: refreshToken,
    });

    return res;
  }
}
module.exports = new TokenService();
