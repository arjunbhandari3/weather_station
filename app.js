var MongoClient = require("mongodb").MongoClient;
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const routes = require("./routes/index");
app.use("/", routes);

const apiRoutes = require("./routes/apiRoute");
app.use("/api", apiRoutes);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
