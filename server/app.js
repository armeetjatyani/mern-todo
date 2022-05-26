var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var tasksRouter = require("./routes/tasks");

var app = express();
var cors = require("cors");
var mongoose = require("mongoose");
const { authorize } = require("./middleware/authorize");

mongoose.connect("mongodb+srv://api:gtLtizsEOSI4KATG@cluster0.9wxrh.mongodb.net/db");

mongoose.connection.on("open", () => {
	console.log("[DB] connected to MongoDB with mongoose client");
});

app.use(
	cors({
		// origin: "http://localhost:3000",
		origin: "*",
	})
);
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);

app.use(function errorHandler(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
