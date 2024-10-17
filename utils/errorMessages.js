// contains all the error messages that are returned by the endpoints
module.exports = {
	missingFields(name) {
		return {
			message: `${name} is required`,
			status: 400,
		};
	},
	validation: {
		invalidId: {
			message: "Please provide a valid id",
			status: 400,
		},
		yearOfPublication: {
			message: "Year of publication must be an integer number",
			status: 400,
		},
		price: {
			message: "Price must be a number",
			status: 400,
		},
		numberOfPages: {
			message: "Number of pages must be an integer number",
			status: 400,
		},
		discount: {
			message: "discount must be a number",
			status: 400,
		},
		condition: {
			message: "condition must either be new or used",
			status: 400,
		},
	},
	notFound: {
		message: "Comic book not found",
		status: 404,
	},
	internalServerError: {
		message: "Internal server error",
		status: 500,
	},
};
