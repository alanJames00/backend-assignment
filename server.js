const express = require("express");
require("dotenv").config();

// express app setup
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
