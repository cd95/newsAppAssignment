var router = require("express").Router();
router.use("/api/news", require("./news.route"));
module.exports = router;
