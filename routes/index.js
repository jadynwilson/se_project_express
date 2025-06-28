const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const likesRouter = require("./likes");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use("/likes", likesRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
