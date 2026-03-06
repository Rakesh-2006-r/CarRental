import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { bookingId, receiverId, text } = req.body;
    const senderId = req.user._id;

    if (!text) {
      return res.json({ success: false, message: "Message is required" });
    }

    const newMessage = await Message.create({
      booking: bookingId,
      sender: senderId,
      receiver: receiverId,
      text,
    });

    // Populate sender details before sending response to render it in front end instantly
    await newMessage.populate("sender", "name image");

    res.json({ success: true, message: newMessage });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const messages = await Message.find({ booking: bookingId })
      .populate("sender", "name image")
      .sort("createdAt");
    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
