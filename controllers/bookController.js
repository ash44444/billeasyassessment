const Book = require("../models/Book");
const Review = require("../models/Review");

// Add a new book (authenticated user only)
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const newBook = await Book.create({
      title,
      author,
      genre,
      description,
      createdBy: req.user.id,
    });
    res.status(201).json(newBook);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create book", error: err.message });
  }
};

// Get all books with pagination and optional filters
exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filters = {};
    if (author) filters.author = new RegExp(author, "i");
    if (genre) filters.genre = genre;

    const books = await Book.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const count = await Book.countDocuments(filters);
    res.json({ total: count, page: +page, books });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get books", error: err.message });
  }
};

// Get single book with average rating and paginated reviews
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const reviews = await Review.find({ book: book._id })
      .populate("user", "username")
      .skip((page - 1) * limit)
      .limit(limit);

    const allReviews = await Review.find({ book: book._id });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) /
      (allReviews.length || 1);

    res.json({ book, averageRating: avgRating.toFixed(1), reviews });
  } catch (err) {
    res.status(500).json({ message: "Failed to get book", error: err.message });
  }
};

// Search books by title or author (partial and case-insensitive)
exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};
