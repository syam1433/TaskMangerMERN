const express = require("express");
const { register, login, getAllUsers, getProfile } = require("../controllers/authController");

// ✅ IMPORT MIDDLEWARES (THIS WAS MISSING)
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getProfile);

// ✅ Admin-only: fetch all users
router.get("/users", auth, role("admin"), getAllUsers);

module.exports = router;
