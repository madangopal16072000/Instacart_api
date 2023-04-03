const mongoose = require("mongoose");

const dburl = process.env.DB_URL || "mongodb://localhost:27017/Ecommerce";
const connectDatabase = () => {
  mongoose.connect(dburl).then(() => {
    console.log("MongoDb connected to Ecommerce Database");
  });
};

module.exports = connectDatabase;
