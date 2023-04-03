const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserByAdmin,
  deleteUserByAdmin,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/user").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(updatePassword);
router.route("/user/update").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  // .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
  .get(getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserByAdmin)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUserByAdmin);
module.exports = router;
