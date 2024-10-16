// comic book model definition

module.exports = (sequelize, DataTypes) => {
	const ComicBook = sequelize.define("ComicBook", {
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
		numberOfPages: {
			type: DataTypes.INTEGER,
		},
		condition: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
	});

	return ComicBook;
};
