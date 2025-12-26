const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { userTasks, adminTasks } = require("../controllers/taskController");

const router = express.Router();

router.get("/user", auth, role("user"), userTasks);
router.get("/admin", auth, role("admin"), adminTasks);
router.get("/user", auth, role("user"), userTasks);

const { createTask } = require("../controllers/taskController");

router.post(
  "/admin",
  auth,
  role("admin"),
  createTask
);



module.exports = router;
