let stripe = require("stripe");

const stripeSetup = () => {
  stripe = stripe(process.env.STRIPE_SECRET_KEY);
};

module.exports = { stripe, stripeSetup };
