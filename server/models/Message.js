import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;
const messageSchema = new mongoose.Schema(
  {
    booking: { type: ObjectId, ref: "Booking", required: true },
    sender: { type: ObjectId, ref: "User", required: true },
    receiver: { type: ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
