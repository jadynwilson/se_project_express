const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItems");
const { validateCardBody, validateId } = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", validateCardBody, createItem);
router.delete("/:itemId", validateId, deleteItem);

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);

module.exports = router;
