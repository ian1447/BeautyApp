import express from "express";
import Book from "../model/Book.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

// create
// update
// delete

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating } = req.body;

    if (!title || !caption || !rating) res.status(400).json({ message: "Please Provide all necessary details." });

    const newBook = new Book({
      title,
      caption,
      rating,
      user: req.user._id,
    });

    await newBook.save();

    res.status(201).json({ newBook });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ message: error.message });
  }
});

router.get("/", protectRoute, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate("user", "username profileImage");

    const total = await Book.countDocuments();

    res.send({ books, currentPage: page, totalBooks: total, totalPages: Math.ceil(totalBooks / limit) });
  } catch (error) {
    console.log("Error getting books: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user", protectRoute, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.send({ books });
  } catch (error) {
    console.log("Error getting user books: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(401).json({ message: "Book not found" });

    if (book.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "cannot delete book" });

    await Book.deleteOne();

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server errro" });
  }
});

export default router;
