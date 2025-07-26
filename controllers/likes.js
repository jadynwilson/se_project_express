const ClothingItem = require("../models/clothingItem");
const {
  DEFAULT_ERROR,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
} = require("../utils/errors");

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
        return res
          .status(NOT_FOUND_ERROR)
          .send({ message: "The requested resource was not found." });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." }); // <=== add return here
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
        return res
          .status(NOT_FOUND_ERROR)
          .send({ message: "The requested resource was not found." });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." }); // <=== add return here
    });

module.exports = {
  likeItem,
  dislikeItem,
};
