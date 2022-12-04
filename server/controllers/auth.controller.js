const { validationResult } = require("express-validator");
const { authService } = require("../services");
const ApiError = require("../exceptions/api");

const TEN_DAYS = 10 * 24 * 60 * 60 * 1000;

class AuthController {
  async registration(req, res, next) {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        const errors = result.array();
        throw ApiError.BadRequestError(
          "Error while user registration.",
          errors
        );
      }

      const { email, password } = req.body;
      const userData = await authService.registerUser(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: TEN_DAYS,
        httpOnly: true,
      });

      res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const { link } = req.params;
      await authService.activateUserBy(link);
      res.redirect(302, `${process.env.CLIENT_URL}/login`);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
