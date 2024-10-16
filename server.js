const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { sequelize } = require("./models/index");
const comicBookRoutes = require("./routes/comicBook.routes");
const comicBookAdminRoutes = require("./routes/comicBook.admin.routes");

// express app setup
const app = express();
const PORT = process.env.PORT || 3000;

// middleware setup
app.use(cors());
app.use(express.json());

// router mounts
app.use("/comics", comicBookRoutes);
app.use("/admin/comics/", comicBookAdminRoutes);

// sync the db and start the server
sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`server listening on ${3000}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
