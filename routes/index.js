const router = require("express").Router();
const userRouter = require("./users");
const getItems = require("./clothingItems");
const likesRouter = require("./likes");
const { NOT_FOUND_ERROR } = require("../utils/errors");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");

router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getItems);

router.use(auth);

router.use("/users", userRouter);
router.use("/items", getItems);
router.use("/items", likesRouter);

router.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR)
    .send({ message: "The requested resource was not found." });
});

module.exports = router;
