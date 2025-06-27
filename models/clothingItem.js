const mongoose = require("mongoose");

const validator = require(validator);

const clothingItemSchema = new mongoose.Schema({
  name: { type: String, requierd: true, minlength: 2, maxlength: 30 },
  weather: {
    type: String,
    requierd: [true, "The avatar field is required"],
    enum: ["warm", "hot", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports.Item = mongoose.model("item", clothingItemsSchema);
