import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import Booking from "../model/Bookings.js";
import mongoose from "mongoose";

const router = express.Router();
// create
// update
// delete

router.post("/", protectRoute, async (req, res) => {
  try {
    const { beautician_id, ubooker_id, beauticianWork_id, datetime, status, amount } = req.body;

    if (!beautician_id || !ubooker_id || !beauticianWork_id || !datetime || !status || !amount)
      res
        .status(400)
        .json({ message: "Please Provide all necessary details." });

    const newBooking = new Booking({
      beautician_id,
      ubooker_id,
      beauticianWork_id,
      datetime,
      status, 
      amount
    });

    await newBooking.save();

    res.status(201).json({ newBooking });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ message: error.message });
  }
});

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

export default router;
