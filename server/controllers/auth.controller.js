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

  async activate(req, res, next) {
    try {
      const { link } = req.params;
      await authService.activateUserBy(link);
      res.redirect(302, `${process.env.CLIENT_URL}/login`);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
  async logout(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
