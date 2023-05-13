const router = require("express").Router();
const newsController = require("../controller/news.controller");
router.get("/", async (req, res, next) => {
  try {
    res.status(200).send({
      status: "Success",
      data: await newsController.getNews({
        limit: req.query.limit || 10,
        keyword: req.query.keyword || "Supreme Court",
        country: req.query.country || "us",
      }),
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .send({ status: "Error", message: error.message });
  }
});

module.exports = router;
