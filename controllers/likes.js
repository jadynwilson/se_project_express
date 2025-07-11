const ClothingItem = require("../models/clothingItem");
const { DEFAULT_ERROR, NOT_FOUND_ERROR } = require("../utils/errors");

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
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

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
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

module.exports = {
  likeItem,
  dislikeItem,
};
