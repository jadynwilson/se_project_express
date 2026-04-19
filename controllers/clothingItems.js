const ClothingItem = require("../models/clothingItem");

const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res) =>
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      next(err);
    });

const deleteItem = (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;

  return ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId) {
        next(new ForbiddenError("You cannot delete items owned by others."));
        return;
      }

      return item
        .deleteOne()
        .then(() =>
          res.status(200).send({ message: "Item deleted successfully." })
        );
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not Found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID."));
      } else {
        next(err);
      }
    });
};

module.exports = { createItem, getItems, deleteItem };
