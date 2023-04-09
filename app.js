if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middleware/error");
const fileUpload = require("express-fileupload");
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const app = express();
const helmet = require("helmet");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());

const scriptSrcUrls = [
  "https://m.stripe.network",
  "https://fonts.googleapis.com/",
];
const styleSrcUrls = [
  "https://m.stripe.network",
  "https://fonts.googleapis.com/",
];
const connectSrcUrls = ["https://m.stripe.network"];
const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/dpo7yvwxc/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);
// Route Imports

app.get("/", (req, res) => {
  res.send("Welcome to my Instacart Api");
});
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

// middleware for Errors
app.use(errorMiddleware);

module.exports = app;
