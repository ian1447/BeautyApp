import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema(
  {
    beautician_id: { type: Schema.Types.ObjectId, ref: "Beautician" },
    ubooker_id: { type: Schema.Types.ObjectId, ref: "User" },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
