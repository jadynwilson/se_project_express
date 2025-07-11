const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const likesRouter = require("./likes");
const { NOT_FOUND_ERROR } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use("/items", likesRouter);

router.use((req, res) => {
  res.status(404).send({ message: NOT_FOUND_ERROR });
});

module.exports = router;
