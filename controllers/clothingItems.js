const ClothingItem = require("../models/clothingItem");
const { DEFAULT_ERROR, NOT_FOUND_ERROR } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid data" });
      }
      return res.status(500).send({ message: DEFAULT_ERROR });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: DEFAULT_ERROR });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.status(200).send({
        message: "Item deleted successfully",
        item,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: NOT_FOUND_ERROR });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid data" });
      }
      return res.status(500).send({ message: DEFAULT_ERROR });
    });
};

module.exports = { createItem, getItems, deleteItem };
