import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema({
    chat_text: {
        type: String,
        required: true,
        unique: true
    },
    beautician_id: { type: Schema.Types.ObjectId, ref: "Beautician" },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: true
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;