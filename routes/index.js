const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const likesRouter = require("./likes");
const { NOT_FOUND_ERROR } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use("/items", likesRouter);

router.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR)
    .send({ message: "The requested resource was not found." });
});

module.exports = router;
