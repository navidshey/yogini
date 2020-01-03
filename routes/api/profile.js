const express = require("express");
const router = express.Router();

// @route   Get api/profile/test
// @test    Test profiles route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "profiles works" }));

module.exports = router;
