const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createOrUpdataProductReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();
// isAuthenticatedUser, authorizedRoles("admin"),
router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

router.route("/product/:id").get(getProductDetails);
router
  .route("/reviews")
  .put(isAuthenticatedUser, createOrUpdataProductReview)
  .delete(isAuthenticatedUser, deleteReview)
  .get(getAllReviews);
module.exports = router;
