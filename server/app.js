var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");

var app = express();
var cors = require("cors");
var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://api:gtLtizsEOSI4KATG@cluster0.9wxrh.mongodb.net/db");

mongoose.connection.on("open", () => {
	console.log("[DB] connected to MongoDB with mongoose client");
});

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/auth", authRouter);

module.exports = app;
