const mongoose = require("mongoose");

var User = mongoose.Schema;

var UserSchema = new User({
	username: { type: String, required: true },
	password: { type: String, required: true },
});


var User = mongoose.model("users", UserSchema);

module.exports = User;