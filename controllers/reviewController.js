const Review = require("../models/Review");

// Add a review (1 per user per book)
exports.addReview = async (req, res) => {
  try {
    const existing = await Review.findOne({
      book: req.params.id,
      user: req.user.id,
    });
    if (existing)
      return res.status(400).json({ message: "Review already exists" });

    const { rating, comment } = req.body;
    const review = await Review.create({
      book: req.params.id,
      user: req.user.id,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: err.message });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const { rating, comment } = req.body;
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();
    res.json(review);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update review", error: err.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await review.remove();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete review", error: err.message });
  }
};
