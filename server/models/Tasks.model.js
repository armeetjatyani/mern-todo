const mongoose = require("mongoose");

var Tasks = mongoose.Schema;

var TasksSchema = new Tasks({
	username: { type: String, required: true },
	tasks: [{ description: String, status: Boolean }],
});

var Task = mongoose.model("tasks", TasksSchema);

module.exports = Task;
