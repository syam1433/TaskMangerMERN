const express = require("express");
const { register, login, getAllUsers, getProfile } = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getProfile);

router.get("/users", auth, role("admin"), getAllUsers);

module.exports = router;
