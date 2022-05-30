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

router.post("/", authorize, async (req, res, next) => {
	if (!req.body) {
		res.status(400).json({ error: "no body provided" });
		return;
	}
	if (!req.body.username || req.body.username.length === 0) {
		res.status(400).json({ error: "Invalid or empty username" });
		return;
	}

	if (!req.body.description || req.body.description.length === 0) {
		res.status(400).json({ error: "Invalid or empty description" });
		return;
	}

	const tasks = await Task.findOne({ username: req.body.username });

	if (!tasks) {
		const newTask = new Task({ username: req.body.username, tasks: [] });
		newTask.save();
		res.json([]);
		return;
	}

	tasks.tasks.push({ description: req.body.description, status: true });
	tasks.save().then((saved) => {
		res.json({ success: "added task" });
	});
});

router.delete("/", authorize, async (req, res, next) => {
	if (!req.body) {
		res.status(400).json({ error: "no body provided" });
		return;
	}
	if (!req.body.username || req.body.username.length === 0) {
		res.status(400).json({ error: "Invalid or empty username" });
		return;
	}

	if (req.body._id === undefined || req.body._id === null) {
		res.status(400).json({ error: "Invalid or empty task id" });
		return;
	}

	const tasks = await Task.findOne({ username: req.body.username });

	if (!tasks) {
		const newTask = new Task({ username: req.body.username, tasks: [] });
		newTask.save();
		res.json([]);
		return;
	}

	tasks.tasks.pull(req.body._id);

	tasks.save().then((saved) => {
		res.json({ success: "removed task" });
	});
});

router.put("/", authorize, async (req, res, next) => {
	if (!req.body) {
		res.status(400).json({ error: "no body provided" });
		return;
	}
	if (!req.body.username || req.body.username.length === 0) {
		res.status(400).json({ error: "Invalid or empty username" });
		return;
	}

	if (req.body._id === undefined || req.body._id === null) {
		res.status(400).json({ error: "Invalid or empty task id" });
		return;
	}

	const tasks = await Task.findOne({ username: req.body.username });

	if (!tasks) {
		const newTask = new Task({ username: req.body.username, tasks: [] });
		newTask.save();
		res.json([]);
		return;
	}

	for (task of tasks.tasks) {
		if (task._id == req.body._id) {
			task.status = !task.status;
		}
	}

	tasks.save().then((saved) => {
		res.json({ success: "removed task" });
	});
});

module.exports = router;
