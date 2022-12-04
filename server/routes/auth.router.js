const express = require("express");

const { authController } = require("../controllers");

const router = express.Router();

router.post("/registration", authController.registration);
router.get("/activate/:link", authController.activate);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

module.exports = router;
