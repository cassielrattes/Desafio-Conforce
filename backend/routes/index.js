const router = require("express").Router();

router.use("/ingredient", require("./ingredient"));
router.use("/lunch", require("./lunch"));

module.exports = router;
