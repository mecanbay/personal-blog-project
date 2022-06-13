const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("HELLO BLOG");
});


module.exports = router