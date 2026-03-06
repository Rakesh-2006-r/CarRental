import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const ChatBox = ({ booking, onClose }) => {
  const { axios, user } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Determine receiver. If current user is owner of car, receiver is booking.user, else booking.owner
  const isOwnerViewing = user.role === "owner";
  const receiverId = isOwnerViewing
    ? booking.user._id || booking.user
    : booking.owner._id || booking.owner;

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`/api/messages/${booking._id}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);
    return () => clearInterval(interval);
  }, [booking._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { data } = await axios.post("/api/messages", {
        bookingId: booking._id,
        receiverId,
        text: newMessage,
      });

      if (data.success) {
        setMessages([...messages, data.message]);
        setNewMessage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] md:w-[400px] h-[500px] rounded-lg shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <h3 className="font-semibold text-lg line-clamp-1">
            Chat regarding {booking.car.brand} {booking.car.model}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 cursor-pointer font-bold text-xl"
          >
            &times;
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 my-auto">
              No messages yet. Start a conversation!
            </p>
          ) : (
            messages.map((msg, index) => {
              const isMine = msg.sender._id === user._id;
              return (
                <div
                  key={index}
                  className={`flex flex-col max-w-[80%] ${isMine ? "self-end items-end" : "self-start items-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg text-sm ${
                      isMine
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          className="p-3 bg-white border-t border-gray-200 flex gap-2"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
