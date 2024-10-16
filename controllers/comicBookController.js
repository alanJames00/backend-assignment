const { ComicBook } = require("../models/index");

// create new comic book
exports.createBook = async (req, res) => {
	try {
		const comicBook = await ComicBook.create(req.body);
		return res.status(201).json(comicBook);
	} catch (err) {
		// handle validation errors
		if (err.name == "SequelizeValidationError") {
			return res.status(400).json({ message: err.errors[0].message });
		}
		return res.status(500).json({ message: "Internal server error" });
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
		return res.status(500).json({ message: "Internal server error" });
	}
};

exports.getBookById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "Please provide a valid id" });
		}
		const comicBook = await ComicBook.findByPk(id);
		if (!comicBook) {
			return res.status(404).json({ message: "Comic book not found" });
		}
		return res.status(200).json(comicBook);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};
