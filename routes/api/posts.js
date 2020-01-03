const express = require("express");
const router = express.Router();

// @route   Get api/post/test
// @test    Test posts route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

module.exports = router;
