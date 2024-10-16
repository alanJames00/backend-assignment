// admin routes for comicBook
const express = require("express");
const router = express.Router();
const comicBookController = require("../controllers/comicBookController");

// create a new comic book
router.post("/", comicBookController.createBook);

// update a specific comic book by id
router.put("/:id", comicBookController.updateBook);

// delete a specific comic book by did
router.delete("/:id", comicBookController.deleteBook);

module.exports = router;
