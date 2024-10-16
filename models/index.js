// initializes and manages the db connection and models
const { Sequelize, DataTypes } = require("sequelize");

// initialize the db connection
const sequelize = new Sequelize(process.env.DATABASE_URI, {
	dialect: "postgres",
	logging: false,
});

// test the connection
sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((err) => {
		console.log("Error connecting to database:", err);
	});

// import and use the defined models
const ComicBook = require("./comicBook")(sequelize, DataTypes);

// export the db connection and models
module.exports = {
	sequelize,
	ComicBook,
};
