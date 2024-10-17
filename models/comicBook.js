// comic book model definition

module.exports = (sequelize, DataTypes) => {
	const ComicBook = sequelize.define("Books", {
		bookName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		authorName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		yearOfPublication: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		discount: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		numberOfPages: {
			type: DataTypes.INTEGER,
		},
		condition: {
			type: DataTypes.ENUM("new", "used"),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
	});

	return ComicBook;
};
