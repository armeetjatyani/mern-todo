var express = require("express");
const authorize = require("../middleware/authorize");
var router = express.Router();
const Task = require("../models/Tasks.model");

router.get("/:username", authorize, async (req, res, next) => {
	if (!req.params) {
		res.status(400).json({ error: "no username provided" });
		return;
	}
	if (!req.params.username || req.params.username.length === 0) {
		res.status(400).json({ error: "Invalid or empty username" });
		return;
	}

	const tasks = await Task.findOne({ username: req.params.username });

	if (!tasks) {
		const newTask = new Task({ username: req.params.username, tasks: [] });
		newTask.save();
		res.json([]);
		return;
	}
	res.json(tasks.tasks);
});



module.exports = router;
