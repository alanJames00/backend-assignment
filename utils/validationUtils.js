// contains table schema validators
const { ValidationError } = require("../errors/customError");
const errorMessages = require("../utils/errorMessages");

const conditionEnum = ["new", "used"];

module.exports = {
	validateComicBook: (comicBook) => {
		// check if bookName exists
		if (!comicBook.bookName) {
			throw new ValidationError(
				errorMessages.missingFields("bookName").message,
				errorMessages.missingFields("bookName").status,
			);
		}

		// check if authorName exists
		if (!comicBook.authorName) {
			throw new ValidationError(
				errorMessages.missingFields("authorName").message,
				errorMessages.missingFields("authorName").status,
			);
		}

		// check if yearOfPublication exists and its an integer
		if (comicBook.yearOfPublication == undefined) {
			throw new ValidationError(
				errorMessages.missingFields("yearOfPublication").message,
				errorMessages.missingFields("yearOfPublication").status,
			);
		}
		if (!Number.isInteger(comicBook.yearOfPublication)) {
			throw new ValidationError(
				errorMessages.validation.yearOfPublication.message,
				errorMessages.validation.yearOfPublication.status,
			);
		}

		// check if price exists and its a number
		if (comicBook.price == undefined) {
			throw new ValidationError(
				errorMessages.missingFields("price").message,
				errorMessages.missingFields("price").status,
			);
		}
		if (isNaN(comicBook.price)) {
			throw new ValidationError(
				errorMessages.validation.price.message,
				errorMessages.validation.price.status,
			);
		}

		// check if condition exits and its an enum
		if (!comicBook.condition) {
			throw new ValidationError(
				errorMessages.missingFields("condition").message,
				errorMessages.missingFields("condition").status,
			);
		}
		if (!conditionEnum.includes(comicBook.condition)) {
			throw new ValidationError(
				errorMessages.validation.condition.message,
				errorMessages.validation.condition.status,
			);
		}

		// check if discount exist, and if its exists, its a number
		if (comicBook.discount != undefined) {
			if (isNaN(comicBook.discount)) {
				throw new ValidationError(
					errorMessages.validation.discount.message,
					errorMessages.validation.discount.status,
				);
			}
		}

		// check if number of pages exist, and if it exists, its an integer
		if (comicBook.numberOfPages != undefined) {
			if (!Number.isInteger(comicBook.numberOfPages)) {
				throw new ValidationError(
					errorMessages.validation.numberOfPages.message,
					errorMessages.validation.numberOfPages.status,
				);
			}
		}
	},
};
