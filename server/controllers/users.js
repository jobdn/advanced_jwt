class UserController {
  async users(req, res, next) {
    console.log(req);
    res.json([{ one: 1, two: 2 }]);
  }
}

module.exports = new UserController();
