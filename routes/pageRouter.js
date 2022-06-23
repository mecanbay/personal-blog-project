const express = require("express");
const router = express.Router();
const pageController = require("../controller/pageController");

router.route("/").get(pageController.viewHomePage);
router.route("/about").get(pageController.viewAboutPage);
router.route("/contact").get(pageController.viewContactPage);
router.route("/blog").get(pageController.viewBlogPage);

module.exports = router;
