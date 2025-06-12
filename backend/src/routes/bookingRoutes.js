import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import Booking from "../model/Bookings.js";
import mongoose from "mongoose";

const router = express.Router();
// create
// update
// delete

// router.post("/", protectRoute, async (req, res) => {
//   try {
//     const { chat_text, beautician_id, user_id, sender } = req.body;

//     if (!chat_text || !beautician_id || !user_id || !sender)
//       res
//         .status(400)
//         .json({ message: "Please Provide all necessary details." });

//     const newchat = new Chat({
//       chat_text,
//       beautician_id,
//       user_id,
//       sender,
//     });

//     await newchat.save();

//     res.status(201).json({ newchat });
//   } catch (error) {
//     console.log("error", error);

//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/", protectRoute, async (req, res) => {
//   try {
//     const { user_id, beautician_id } = req.query;

//     if (!user_id || !beautician_id) {
//       return res
//         .status(400)
//         .json({ message: "Missing user_id or beautician_id" });
//     }

//     const chats = await Chat.find({
//       user_id,
//       beautician_id,
//     })
//       .populate("user_id", "username")
//       .lean();

//     res.send(chats);
//   } catch (error) {
//     console.log("Error getting Chats: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.get("/user", protectRoute, async (req, res) => {
//   try {
//     const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });

//     res.send({ books });
//   } catch (error) {
//     console.log("Error getting user books: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.delete("/:id", protectRoute, async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) return res.status(401).json({ message: "Book not found" });

//     if (book.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "cannot delete book" });

//     await Book.deleteOne();

//     res.json({ message: "Deleted Successfully" });
//   } catch (error) {
//     console.log("error", error);
//     return res.status(500).json({ message: "Internal server errro" });
//   }
// });

export default router;
