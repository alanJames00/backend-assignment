const { ComicBook } = require("../models/index");
const errorMessages = require("../utils/errorMessages");
const customErrors = require("../errors/customError");
const {
	validateComicBook,
	validateComicBookUpdate,
} = require("../utils/validationUtils");

// create new comic book
exports.createBook = async (req, res) => {
	try {
		// validate the request body
		validateComicBook(req.body);
		const comicBook = await ComicBook.create(req.body);
		return res.status(201).json(comicBook);
	} catch (err) {
		// handle validation errors
		if (err instanceof customErrors.ValidationError) {
			return res.status(err.statusCode).json({
				err: err.message,
			});
		}

		return res
			.status(errorMessages.internalServerError.status)
			.json({ err: errorMessages.internalServerError.message });
	}
};

// fetch all comic books with pagination
exports.getBooks = async (req, res) => {
	try {
		// extract query parameters
		const {
			page = 1,
			limit = 15,
			sortBy = "id",
			order = "ASC",
			...filters
		} = req.query;

		// calculate pagination values
		const paginationOpts = {
			limit: parseInt(limit),
			offset: (parseInt(page) - 1) * parseInt(limit),
		};

		// calculate sorting values
		const sortingOpts = {
			order: [[sortBy, order.toUpperCase()]],
		};

		// build filter object
		const filterOpts = {};
		if (filters.bookName) fitlerOpts.bookName = filters.bookName;
		if (filters.authorName) filterOpts.authorName = filters.authorName;
		if (filters.yearOfPublication)
			filterOpts.yearOfPublication = filters.yearOfPublication;
		if (filters.condition) filterOpts.condition = filters.condition;
		if (filters.price) filterOpts.price = filters.price;

		// perform the query
		const comicBooks = await ComicBook.findAll({
			...paginationOpts,
			...sortingOpts,
			where: filterOpts,
		});

		// fetch total count of records for pagination calculation
		const totalBooks = await ComicBook.count({ where: filterOpts });

		return res.json({
			page: parseInt(page),
			limit: parseInt(limit),
			totalPages: Math.ceil(totalBooks / limit),
			totalBooks,
			results: comicBooks,
		});
	} catch (err) {
		console.log(err);
		return res.status(errorMessages.internalServerError.status).json({
			err: errorMessages.internalServerError.message,
		});
	}
};

exports.getBookById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id || isNaN(id)) {
			return res.status(errorMessages.validation.invalidId.status).json({
				err: errorMessages.validation.invalidId.message,
			});
		}
		const comicBook = await ComicBook.findByPk(id);
		if (!comicBook) {
			return res.status(errorMessages.notFound.status).json({
				err: errorMessages.notFound.message,
			});
		}
		return res.status(200).json(comicBook);
	} catch (err) {
		console.log(err);
		return res.status(errorMessages.internalServerError.status).json({
			err: errorMessages.internalServerError.message,
		});
	}
};

exports.updateBook = async (req, res) => {
	try {
		const { id } = req.params;

		// validate inputs
		if (!id || isNaN(id)) {
			return res.status(errorMessages.validation.invalidId.status).json({
				err: errorMessages.validation.invalidId.message,
			});
		}
		const comicBook = await ComicBook.findByPk(id);

		if (!comicBook) {
			return res.status(errorMessages.notFound.status).json({
				err: errorMessages.notFound.message,
			});
		}

		// validate the request body fields as sequelize does not throw validation errors on update
		validateComicBookUpdate(req.body);

		const updatedComicBook = await comicBook.update(req.body);

		return res.status(200).json(updatedComicBook);
	} catch (err) {
		// handle validation errors
		if (err instanceof customErrors.ValidationError) {
			return res.status(err.statusCode).json({
				err: err.message,
			});
		}

		console.log(err);
		return res.status(errorMessages.internalServerError.status).json({
			err: errorMessages.internalServerError.message,
		});
	}
};

exports.deleteBook = async (req, res) => {
	try {
		const { id } = req.params;

		// validate inputs
		if (!id || isNaN(id)) {
			return res.status(errorMessages.validation.invalidId.status).json({
				err: errorMessages.validation.invalidId.message,
			});
		}

		const comicBook = await ComicBook.findByPk(id);
		if (!comicBook) {
			return res.status(errorMessages.notFound.status).json({
				err: errorMessages.notFound.message,
			});
		}
		await comicBook.destroy();
		return res.status(204).json();
	} catch (err) {
		console.log(err);
		return res.status(errorMessages.internalServerError.status).json({
			err: errorMessages.internalServerError.message,
		});
	}
};
