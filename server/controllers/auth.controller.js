const { authService } = require("../services");

const TEN_DAYS = 10 * 24 * 60 * 60 * 1000;

class AuthController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await authService.registerUser(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: TEN_DAYS,
        httpOnly: true,
      });

      res.json(userData);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
  async login(req, res, next) {
    try {
    } catch (error) {}
  }
  async logout(req, res, next) {
    try {
    } catch (error) {}
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }
}

module.exports = new AuthController();
