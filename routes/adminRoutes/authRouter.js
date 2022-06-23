const express = require("express");
const router = express.Router();
const authController = require("../../controller/adminControllers/authController");
const userController = require("../../controller/adminControllers/settings/userController");
const roleController = require("../../controller/adminControllers/settings/roleController");

const redirectMiddleware = require("../../middlewares/redirectMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");
router
  .route("/dashboard")
  .get(authMiddleware, authController.viewDashboardPage);
router.route("/login").get(redirectMiddleware,authController.viewLoginPage);
router.route("/login").post(redirectMiddleware,authController.loginUser);
router.route("/logout").get(authMiddleware,authController.logoutUser);

//SETTINGS

// USER MANAGEMENT
router.route("/settings/create-user").get(authMiddleware,userController.viewUserCreatePage);
router.route("/settings/create-user").post(authMiddleware,userController.createUser);
router.route("/settings/users").get(authMiddleware,userController.viewUsersPage);

// ROLES MANAGEMENT
router.route("/settings/create-role").get(authMiddleware,roleController.viewRoleCreatePage);
router.route("/settings/create-role").post(authMiddleware,roleController.createRole);
router.route("/settings/update-role").put(authMiddleware,roleController.updateRole);
router.route("/settings/delete-role/:id").delete(authMiddleware,roleController.deleteRole);
router.route("/settings/roles").get(authMiddleware,roleController.viewRolesPage);
router.route("/settings/roles/:id").get(authMiddleware,roleController.getRole);

module.exports = router;
