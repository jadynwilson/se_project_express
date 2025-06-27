const router = require("express").Router();
const { getUsers } = require("../controllers/users.js");

router.get("/", getUsers);
router.get("/:userId", () => console.log("GET users by ID"));
router.post("/", () => console.log("POST user"));

module.exports = router;
