const express = require("express");
const router = express.Router();
const comicBookController = require("../controllers/comicBookController");

// fetches all the comic books with pagination, sorting and filtering
router.get("/", comicBookController.getBooks);

// get a specific comic book by id
router.get("/:id", comicBookController.getBookById);

module.exports = router;
