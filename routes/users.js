const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");

router.get("/users/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
