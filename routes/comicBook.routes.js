const express = require("express");
const router = express.Router();
const comicBookController = require("../controllers/comicBookController");

// fetches all the comic books
router.get("/", comicBookController.getBooks);

// create a new comic book
router.post("/", comicBookController.createBook);

// get a specific comic book by id
router.get("/getById/:id", comicBookController.getBookById);

// update a specific comic book by id
router.put("/:id");

// delete a specific comic book by id
router.delete("/:id");

module.exports = router;
