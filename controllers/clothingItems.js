const ClothingItem = require("../models/clothingItem");
const {
  DEFAULT_ERROR,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  FORBIDDEN_ERROR,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const deleteItem = (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId) {
        return res
          .status(FORBIDDEN_ERROR)
          .send({ message: "You cannot delete items owned by others." });
      }

      return item
        .deleteOne()
        .then(() =>
          res.status(200).send({ message: "Item deleted successfully." })
        );
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found." });
      }
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

module.exports = { createItem, getItems, deleteItem };
