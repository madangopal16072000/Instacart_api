const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/orderModel");
const ErrorHandler = require("../util/errorhandler");

// create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  paymentInfo.paidAt = Date.now();
  console.log(req.body);
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get all orders for logged in user
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders for admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order status -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  
  if(!order)
  {
    return next(new ErrorHandler(`Order doesn't exists with id : ${req.params.id}`));
  }
  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler("You have successfully delivered this order", 400)
    );
  }

  if (req.body.orderStatus === "Processing") {
    order.orderItems.forEach((order) => {
      updateStock(order.Product, order.quantity);
    });
  }

  order.orderStatus = req.body.orderStatus;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success : true,
    order
  })
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete order --admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order doesn't exist with id : ${req.params.id}`, 400)
    );
  }
  await order.remove();

  res.status(200).json({
    success: true,
    order,
  });
});
