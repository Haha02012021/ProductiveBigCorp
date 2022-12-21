var express = require("express");
var logger = require("morgan");
var path = require("path");
var dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
dotenv.config();
var authRouter = require("./routes/auth");
var factoryRouter = require("./routes/factory");
var coporationRouter = require("./routes/coporation");
var storeRouter = require("./routes/store");
var indexRouter = require("./routes/index");
var warrantyRouter = require("./routes/warranty");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; //  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
app.get("/", (req, res) => {
  res.json({ hello: "hello" });
});
app.use("/auth", authRouter);
app.use("/factory", factoryRouter);
app.use("/coporation", coporationRouter);
app.use("/store", storeRouter);
app.use("/warranty", warrantyRouter);
app.use("/", indexRouter);

module.exports = app;
