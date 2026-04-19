require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes");

const app = express();

app.use(cors());

const { PORT = 3001 } = process.env;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
module.exports = app;

const errorHandler = require("./middlewares/error-handler");
app.use(errorHandler);

const { errors } = require("celebrate");
app.use(errors());

const { requestLogger, errorLogger } = require("./middlewares/logger");
app.use(requestLogger);
app.use(errorLogger);
