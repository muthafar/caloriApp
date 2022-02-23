const mongoose = require("mongoose");

module.exports = () =>
  mongoose
    .connect(process.env.MONGO_URl)
    .then(() => {
      console.log("DB is Connected");
    })
    .catch((e) => console.log(e));
