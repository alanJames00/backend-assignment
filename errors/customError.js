// contains custom error classes

class CustomError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

// schema validation errors
class ValidationError extends CustomError {
	constructor(message, status) {
		super(message, status);
		this.statusCode = status;
		this.message = message;
	}
}

module.exports = {
	CustomError,
	ValidationError,
};
