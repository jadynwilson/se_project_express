const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  DEFAULT_ERROR,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
} = require("../utils/errors");

const updateCurrentUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  )
    .select("-password")
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid data provided" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found" });
      }
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(401).send({ message: "Incorrect email or password" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .select("-password")
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found." });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid user ID" });
      }
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ name, avatar, email, password: hash });
    })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      console.error(err);

      if (err.code === 11000) {
        return res.status(409).send({ message: "Email already in use" });
      }

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }

      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
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
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
