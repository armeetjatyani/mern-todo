module.exports = function authorize(req, res, next) {
	if (!req.headers.authorization) {
		throw { status: 401, message: "Not Authorized." };
	}

	try {
		console.log(req.headers.authorization);
		const decoded = jwt.verify(req.headers.authorization, "asecret");
		console.log(decoded);
		return next();
	} catch (err) {
		{
			throw { status: 401, message: "Not Authorized. Invalid token." };
		}
	}

	// User.findById(req.session.userId)
	//   .exec(function (error, user) {
	//     if (error) {
	//       return next(error);
	//     } else {
	//       if (user === null) {
	//         const err = new Error("Not authorized! Go back!");
	//         err.status = 400;
	//         return next(err); // This will be caught by error handler
	//       } else {
	//         return next(); // No error proceed to next middleware
	//       }
	//     }
	//   });
};
