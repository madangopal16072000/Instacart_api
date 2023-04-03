const app = require("./app");
const connectDatabase = require("./config/database");
const bodyParser = require("body-parser");
const { connectCloudinary } = require("./config/cloudinary");
const { stripeSetup } = require("./config/stripeSetup");
// config
app.use(bodyParser.urlencoded({ extended: true }));

// connecting to database
connectDatabase();
//connection to cloudinary
connectCloudinary();
// connection to stripe
// stripeSetup();

const server = app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err}`);
  console.log(
    "Shutting down the server due to unhandled promise rejection error"
  );

  server.close(() => {
    process.exit(1);
  });
});
