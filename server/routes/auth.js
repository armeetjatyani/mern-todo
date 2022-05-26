var express = require("express");
var bcrypt = require("bcryptjs");
var router = express.Router();
var User = require("../models/User.model");
var jwt = require("jsonwebtoken");
const Task = require("../models/Tasks.model");

/* POST auth. */
router.post("/register", async (req, res, next) => {
	if (!req.body) {
		res.status(400).json({ error: "no body provided" });
		return;
	}
	if (!req.body.username || req.body.username.length === 0) {
		res.status(400).json({ error: "Invalid or empty username" });
		return;
	}
	if (!req.body.password || req.body.password.length === 0) {
		res.status(400).json({ error: "Invalid or empty password" });
		return;
	}

	const doesUserExit = await User.exists({ username: req.body.username });

	if (doesUserExit !== null) {
		res.status(400).json({ error: "This username is already taken!" });
		return;
	}

	const newUser = new User({ username: req.body.username, password: req.body.password });
	const newTask = new Task({ username: req.body.username, tasks: [] });
	newUser.save();
	newTask.save();

	res.json({
		accessToken: jwt.sign(
			{
				username: req.body.username,
			},
			"asecret"
		),
		refreshToken: "",
	});
});

router.post("/login", async (req, res, next) => {
	if (!req.body) {
		res.status(400).json({ error: "no body provided" });
		return;
	}

	if (!req.body.username || req.body.username.length === 0) {
		res.status(400).json({ error: "Invalid or empty username" });
		return;
	}
	if (!req.body.password || req.body.password.length === 0) {
		res.status(400).json({ error: "Invalid or empty password" });
		return;
	}

	const user = await User.findOne({ username: req.body.username });

	if (user !== null) {
		const correctCredentials = bcrypt.compareSync(req.body.password, user.password);

		if (correctCredentials) {
			res.json({
				accessToken: jwt.sign(
					{
						username: req.body.username,
					},
					"asecret"
				),
				refreshToken: "",
			});
		} else {
			res.status(401).json({ error: "Incorrect password" });
		}
		return;
	} else {
		res.status(400).json({ error: "This user does not exist" });
	}
});

module.exports = router;
