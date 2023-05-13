dotenv = require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.log(err.stack);

  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: err,
    },
  });
});

let server = app.listen(process.env.PORT || 3001, function () {
  console.log("Listening on port " + server.address().port);
});
