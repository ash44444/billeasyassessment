const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
  searchBooks,
} = require("../controllers/bookController");
const protect = require("../middleware/authMiddleware");

router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.post("/", protect, createBook);

module.exports = router;
