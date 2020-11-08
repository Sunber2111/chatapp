const mongoose = require("mongoose");
const mongoURI = require("./config.json").ConnectionString.default;

const createConnectionToDb = () => {
  try {
    mongoose
      .connect(mongoURI, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("connect db success");
      });
  } catch (error) {}
};

module.exports = createConnectionToDb;
